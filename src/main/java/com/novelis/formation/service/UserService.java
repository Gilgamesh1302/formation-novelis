package com.novelis.formation.service;

import com.novelis.formation.service.dto.UserDto;
import com.novelis.formation.service.exception.DataAlreadyExistsException;
import com.novelis.formation.service.exception.DataNotFoundException;

import java.util.List;

public interface UserService {
    UserDto findUserById(Long id) throws DataNotFoundException;
    List<UserDto> findAllUsers();
    UserDto signupUser(UserDto userDto) throws DataAlreadyExistsException;
    UserDto updateUser(Long id, UserDto updatedUserDto) throws DataNotFoundException;
    String deleteUser(Long id) throws DataNotFoundException;
    UserDto loginUser(UserDto userDto) throws DataNotFoundException;
}
