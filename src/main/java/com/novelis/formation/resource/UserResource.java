package com.novelis.formation.resource;

import com.novelis.formation.service.UserService;
import com.novelis.formation.service.dto.UserDto;
import com.novelis.formation.service.exception.BadRequestException;
import com.novelis.formation.service.exception.DataAlreadyExistsException;
import com.novelis.formation.service.exception.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserResource {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> get(@PathVariable Long id) throws DataNotFoundException {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @PostMapping("/login")
    public ResponseEntity<Authentication> loginUser(@RequestBody UserDto userDto) throws DataNotFoundException {
        userService.loginUser(userDto);
        return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication());
    }

    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) throws DataAlreadyExistsException {
        return ResponseEntity.ok(userService.signupUser(userDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(
            @PathVariable Long id,
            @RequestBody UserDto userDto
    ) throws DataNotFoundException, BadRequestException {
        if (id == null) {
            throw new BadRequestException("id cannot be null");
        }
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws BadRequestException, DataNotFoundException {
        if (id == null) {
            throw new BadRequestException("id cannot be null");
        }
        return ResponseEntity.ok(userService.deleteUser(id));
    }

}
