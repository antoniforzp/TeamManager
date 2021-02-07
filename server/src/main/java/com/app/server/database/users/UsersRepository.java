package com.app.server.database.users;

import com.app.server.model.User;

import java.util.List;

public interface UsersRepository {

    boolean checkCredentials(String email, String password);

    boolean checkIfExists(String email);

    boolean add(String name, String surname, String password, String email);

    boolean add(int userId, String name, String surname, String password, String email);

    List<User> getAll();

    User getById(int userId);

    User getByCredentials(String email, String password);

    boolean update(int userId, String name, String surname, String password);

    boolean deleteById(int userId);

    boolean deleteByEmail(String mail);
}
