package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.users.UsersRepository;
import com.app.server.model.User;
import com.app.server.utils.PasswordHasher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {

    final UsersRepository repository;
    final AppCore appCore;

    public UserController(UsersRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    //PUT: Add user
    @CrossOrigin
    @PostMapping(value = "/add")
    public ResponseEntity<Boolean> addUser(@RequestBody User newUser) {
        return new ResponseEntity<>(repository.add(newUser.getName(),
                newUser.getSurname(),
                newUser.getPassword(),
                newUser.getEmail()), HttpStatus.ACCEPTED);
    }

    //PUT: Edit user
    @CrossOrigin
    @GetMapping(value = "/edit{userId}")
    public ResponseEntity<Boolean> editUser(@PathVariable int userId, @RequestBody User newUser) {
        return new ResponseEntity<>(repository.update(userId,
                newUser.getName(),
                newUser.getSurname(),
                newUser.getPassword()), HttpStatus.ACCEPTED);
    }

    //PUT: Remove user
    @CrossOrigin
    @PostMapping(value = "/remove{userId}")
    public ResponseEntity<Boolean> updateUser(@PathVariable int userId) {
        return new ResponseEntity<>(repository.deleteById(userId), HttpStatus.ACCEPTED);
    }
}
