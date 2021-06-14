package com.app.server.database.usersService;

import com.app.server.model.User;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface UsersService {

    Boolean checkCredentials(String email, String password);

    Boolean checkIfExists(String email);

    Boolean add(String name, String surname, String password, String email);

    Boolean add(int userId, String name, String surname, String password, String email);

    List<User> getAll();

    User getById(int userId);

    User getByEmail(String email);

    Boolean update(int userId, String name, String surname, String password);

    Boolean deleteById(int userId);

    Boolean deleteByEmail(String mail);
}
