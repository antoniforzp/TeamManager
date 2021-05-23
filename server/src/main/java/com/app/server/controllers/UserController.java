package com.app.server.controllers;

import com.app.server.database.teamsService.TeamsService;
import com.app.server.database.usersService.UsersService;
import com.app.server.api.Response;
import com.app.server.api.data.AddUserBody;
import com.app.server.api.data.CheckUserBody;
import com.app.server.api.data.EditUserBody;
import com.app.server.model.User;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class UserController {

    final UsersService usersService;
    final TeamsService teamsService;

    public UserController(UsersService usersService,
                          TeamsService teamsService) {
        this.usersService = usersService;
        this.teamsService = teamsService;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/users/check")
    public Response<Boolean> checkUser(@PathVariable int userId,
                                       @RequestBody CheckUserBody body) {

        CompletableFuture<Boolean> data = usersService.checkIfExists(body.getUserEmail());
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/users")
    public Response<Boolean> addUser(@PathVariable int userId,
                                     @RequestBody AddUserBody body) {

        CompletableFuture<Boolean> data = usersService.add(body.getName(),
                body.getSurname(),
                body.getPassword(),
                body.getEmail());
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/users")
    public Response<User> getUser(@PathVariable int userId) {

        CompletableFuture<User> data = usersService.getById(userId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/users")
    public Response<Boolean> editUser(@PathVariable int userId,
                                      @RequestBody EditUserBody body) {

        CompletableFuture<Boolean> data = usersService.update(userId,
                body.getName(),
                body.getSurname(),
                body.getPassword());
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/users")
    public Response<Boolean> updateUser(@PathVariable int userId) {

        CompletableFuture<Boolean> data = usersService.deleteById(userId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}
