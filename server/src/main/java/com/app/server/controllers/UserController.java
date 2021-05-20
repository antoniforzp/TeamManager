package com.app.server.controllers;

import com.app.server.database.teams.TeamsRepository;
import com.app.server.database.users.UsersRepository;
import com.app.server.api.Response;
import com.app.server.api.data.AddUserBody;
import com.app.server.api.data.CheckUserBody;
import com.app.server.api.data.EditUserBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    final UsersRepository repository;
    final TeamsRepository tRepository;

    public UserController(UsersRepository repository,
                          TeamsRepository tRepository) {
        this.repository = repository;
        this.tRepository = tRepository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/users/check/{userId}")
    public Response<Boolean> checkUser(@PathVariable int userId,
                                       @RequestBody CheckUserBody body) {
        Boolean data = repository.checkIfExists(body.getUserEmail());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/api/users/{userId}")
    public Response<Boolean> addUser(@PathVariable int userId,
                                     @RequestBody AddUserBody body) {
        Boolean data = repository.add(body.getName(),
                body.getSurname(),
                body.getPassword(),
                body.getEmail());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/users/{userId}")
    public Response<Boolean> editUser(@PathVariable int userId, @RequestBody EditUserBody body) {
        boolean data = repository.update(userId,
                body.getName(),
                body.getSurname(),
                body.getPassword());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/users/{userId}")
    public Response<Boolean> updateUser(@PathVariable int userId) {
        Boolean data = repository.deleteById(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
