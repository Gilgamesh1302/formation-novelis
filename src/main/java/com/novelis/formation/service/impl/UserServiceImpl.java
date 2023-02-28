package com.novelis.formation.service.impl;

import com.novelis.formation.domain.User;
import com.novelis.formation.repository.UserRepository;
import com.novelis.formation.security.UserDetailsServiceImpl;
import com.novelis.formation.service.UserService;
import com.novelis.formation.service.dto.UserDto;
import com.novelis.formation.service.exception.DataAlreadyExistsException;
import com.novelis.formation.service.exception.DataNotFoundException;
import com.novelis.formation.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public UserDto findUserById(Long id) throws DataNotFoundException {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("No user with id " + id));
        return userMapper.toDto(user);
    }

    @Override
    public List<UserDto> findAllUsers() {
        return userMapper
                .toDtoList(userRepository.findAll());
    }

    @Override
    public UserDto signupUser(UserDto userDto) throws DataAlreadyExistsException {
        if (userRepository.existsUserByUsername(userDto.getUsername())) {
            throw new DataAlreadyExistsException("Username " + userDto.getUsername() + " already exists");
        }
        User user = userMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper
                .toDto(userRepository.save(user));
    }

    @Override
    public UserDto updateUser(Long id, UserDto updatedUserDto) throws DataNotFoundException {
        if (!userRepository.existsById(id)) {
            throw new DataNotFoundException("No User with id " + id);
        }
        User userToUpdate = userMapper.toEntity(updatedUserDto);
        userToUpdate.setId(id);
        return userMapper
                .toDto(userRepository.save(userToUpdate));
    }

    @Override
    public String deleteUser(Long id) throws DataNotFoundException {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("No User with id " + id));
        userRepository.delete(user);
        return "User Deleted Successfully";
    }

    @Override
    public String loginUser(UserDto userDto) throws DataNotFoundException {
        userRepository
                .findUserByUsername(userDto.getUsername())
                .orElseThrow(() -> new DataNotFoundException("no user found with username " + userDto.getUsername()));
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
        Set<GrantedAuthority> authoritySet = new HashSet<>();
        authoritySet.add(authority);
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword(), authoritySet));
        String stringToEncode = userDto.getUsername() + ":" + userDto.getPassword();
        String authHeader = "Basic " + Base64.getEncoder().encodeToString(stringToEncode.getBytes());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authHeader;
    }

    @Override
    public UserDto getUserInformation(UserDto userDto) throws DataNotFoundException {
        User user = userRepository
                .findUserByUsernameAndPassword(userDto.getUsername(), userDto.getPassword())
                .orElseThrow(() -> new DataNotFoundException("no user found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserDto getAuthenticatedUser(String username) throws DataNotFoundException {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        User user = userRepository
                .findUserByUsername(authentication.getName())
                .orElseThrow(() -> new DataNotFoundException("no user found"));
        return userMapper.toDto(user);
    }
}
