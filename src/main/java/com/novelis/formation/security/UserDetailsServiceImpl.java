package com.novelis.formation.security;

import com.novelis.formation.domain.User;
import com.novelis.formation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
        Set<GrantedAuthority> authoritySet = new HashSet<>();
        authoritySet.add(authority);
        User user  = userRepository
                .findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("no user with username " + username));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                authoritySet
        );
    }
}
