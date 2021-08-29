package com.app.server.api.controllers;

import com.app.server.core.logic.UsersLogic;
import com.app.server.api.rest.body.AddUserBody;
import com.app.server.api.rest.body.CheckUserBody;
import com.app.server.api.rest.body.EditUserBody;
import com.app.server.api.rest.response.Response;
import com.app.server.model.data.User;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {

    private final UsersLogic logic;

    public UserController(UsersLogic logic) {
        this.logic = logic;
    }

    @SneakyThrows
    @PostMapping(value = "/api/users/check")
    public Response<Boolean> checkUser(@RequestBody CheckUserBody body) {

        Boolean data = logic.checkUser(body);

        return new Response<>(
                data,
                -1,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/users")
    public Response<Boolean> addUser(@RequestBody AddUserBody body) {

        Boolean data = logic.addUser(body);

        return new Response<>(
                data,
                -1,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/users")
    public Response<User> getUser(@PathVariable int userId) {

        User data = logic.getUser(userId);

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

        Boolean data = logic.editUser(userId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/users")
    public Response<Boolean> deleteUser(@PathVariable int userId) {

        Boolean data = logic.deleteUser(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
