package com.app.server.controllers;

import com.app.server.api.Response;
import com.app.server.api.data.AddUserBody;
import com.app.server.api.data.CheckUserBody;
import com.app.server.api.data.EditUserBody;
import com.app.server.database.settingsService.SettingsService;
import com.app.server.database.usersService.UsersService;
import com.app.server.model.User;
import com.app.server.transactions.TransactionService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {

    private final UsersService usersService;
    private final TransactionService transactionService;

    public UserController(UsersService usersService,
                          TransactionService transactionService) {
        this.usersService = usersService;
        this.transactionService = transactionService;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/users/check")
    public Response<Boolean> checkUser(@PathVariable int userId,
                                       @RequestBody CheckUserBody body) {

        Boolean data = usersService.checkIfExists(body.getUserEmail());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/users")
    public Response<Boolean> addUser(@PathVariable int userId,
                                     @RequestBody AddUserBody body) {

        // TODO: Initialize users settings here. While adding user return his id
        Boolean data = transactionService.execute(() -> usersService.add(body.getName(),
                body.getSurname(),
                body.getPassword(),
                body.getEmail()));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/users")
    public Response<User> getUser(@PathVariable int userId) {

        User data = usersService.getById(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/users")
    public Response<Boolean> editUser(@PathVariable int userId,
                                      @RequestBody EditUserBody body) {

        Boolean data = transactionService.execute(() -> usersService.update(userId,
                body.getName(),
                body.getSurname(),
                body.getPassword()));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/users")
    public Response<Boolean> updateUser(@PathVariable int userId) {

        Boolean data = transactionService.execute(() -> usersService.deleteById(userId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
