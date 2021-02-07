package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.database.users.UsersRepository;
import com.app.server.rest.Response;
import com.app.server.rest.bodies.AddUserBody;
import com.app.server.rest.bodies.CheckUserBody;
import com.app.server.rest.bodies.EditUserBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    final UsersRepository repository;
    final TeamsRepository teamsRepository;
    final AppCore appCore;

    public UserController(UsersRepository repository, TeamsRepository teamsRepository, AppCore appCore) {
        this.repository = repository;
        this.teamsRepository = teamsRepository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @PostMapping(value = "/users/check")
    public ResponseEntity<Response<Boolean>> addUser(@RequestBody CheckUserBody body) {
        return new ResponseEntity<>(new Response<>(
                repository.checkIfExists(body.getEmail()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/users")
    public ResponseEntity<Response<Boolean>> addUser(@RequestBody AddUserBody body) {
        return new ResponseEntity<>(new Response<>(
                repository.add(body.getName(),
                        body.getSurname(),
                        body.getPassword(),
                        body.getEmail()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/users{userId}")
    public ResponseEntity<Response<Boolean>> editUser(@PathVariable int userId, @RequestBody EditUserBody body) {
        boolean check = repository.update(userId,
                body.getName(),
                body.getSurname(),
                body.getPassword());

        //Update current user
        if (check) {
            appCore.setCurrentUser(repository.getById(userId));
        }

        return new ResponseEntity<>(new Response<>(
                check,
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/users{userId}")
    public ResponseEntity<Response<Boolean>> updateUser(@PathVariable int userId) {
        return new ResponseEntity<>(new Response<>(
                repository.deleteById(userId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
