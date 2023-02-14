package com.novelis.formation.dao;

import com.novelis.formation.domain.User;

public interface UserDao extends AbstractDao<User, Long>{
    User findByUsernameAndPassword(String username, String password);
}
