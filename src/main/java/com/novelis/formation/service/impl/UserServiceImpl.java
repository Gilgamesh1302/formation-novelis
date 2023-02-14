package com.novelis.formation.service.impl;

import com.novelis.formation.domain.User;
import com.novelis.formation.repository.UserRepository;
import com.novelis.formation.service.UserService;
import com.novelis.formation.service.dto.UserDto;
import com.novelis.formation.service.exception.DataAlreadyExistsException;
import com.novelis.formation.service.exception.DataNotFoundException;
import com.novelis.formation.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

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
    public UserDto loginUser(UserDto userDto) throws DataNotFoundException {
        User user = userRepository
                .findUserByUsernameAndPassword(userDto.getUsername(), userDto.getPassword())
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        return userMapper.toDto(user);
    }
}
