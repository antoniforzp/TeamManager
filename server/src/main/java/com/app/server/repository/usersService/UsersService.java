package com.app.server.repository.usersService;

import com.app.server.model.data.User;

import java.util.List;

public interface UsersService {

    Boolean checkCredentials(String email, String password);

    Boolean checkIfExists(String email);

    Integer add(String name, String surname, String password, String email);

    Boolean add(int userId, String name, String surname, String password, String email);

    List<User> getAll();

    User getById(int userId);

    User getByEmail(String email);

    Boolean update(int userId, String name, String surname, String password);

    Boolean deleteById(int userId);

    Boolean deleteByEmail(String mail);
}
