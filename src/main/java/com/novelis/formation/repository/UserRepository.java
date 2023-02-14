package com.novelis.formation.repository;

import com.novelis.formation.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUsernameAndPassword(String username, String password);
    Optional<User> findUserByUsername(String username);
    boolean existsUserByUsername(String username);
}
