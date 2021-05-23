package com.app.server.database.usersService;

import com.app.server.model.User;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface UsersService {

    CompletableFuture<Boolean> checkCredentials(String email, String password);

    CompletableFuture<Boolean> checkIfExists(String email);

    CompletableFuture<Boolean> add(String name, String surname, String password, String email);

    CompletableFuture<Boolean> add(int userId, String name, String surname, String password, String email);

    CompletableFuture<List<User>> getAll();

    CompletableFuture<User> getById(int userId);

    CompletableFuture<User> getByCredentials(String email, String password);

    CompletableFuture<Boolean> update(int userId, String name, String surname, String password);

    CompletableFuture<Boolean> deleteById(int userId);

    CompletableFuture<Boolean> deleteByEmail(String mail);
}
