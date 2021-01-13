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

    //POST: Add user
    @CrossOrigin
    @PostMapping(value = "/check{userMail}")
    public ResponseEntity<Boolean> addUser(@PathVariable String userMail) {
        return new ResponseEntity<>(repository.checkIfExists(userMail), HttpStatus.ACCEPTED);
    }

    //POST: Add user
    @CrossOrigin
    @PostMapping(value = "/add")
    public ResponseEntity<Boolean> addUser(@RequestBody User newUser) {
        return new ResponseEntity<>(repository.add(newUser.getName(),
                newUser.getSurname(),
                newUser.getPassword(),
                newUser.getEmail()), HttpStatus.ACCEPTED);
    }

    //POST: Edit user
    @CrossOrigin
    @PostMapping(value = "/edit{userId}")
    public ResponseEntity<Boolean> editUser(@PathVariable int userId, @RequestBody User newUser) {
        boolean check = repository.update(userId,
                newUser.getName(),
                newUser.getSurname(),
                newUser.getPassword());
        //Update current user
        if (check) {
            appCore.setCurrentUser(repository.getById(userId));
        }
        return new ResponseEntity<>(check, HttpStatus.ACCEPTED);
    }

    //DELETE: Remove user
    @CrossOrigin
    @DeleteMapping(value = "/remove{userId}")
    public ResponseEntity<Boolean> updateUser(@PathVariable int userId) {
        return new ResponseEntity<>(repository.deleteById(userId), HttpStatus.ACCEPTED);
    }
}
