package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.users.UsersRepository;
import com.app.server.model.User;
import com.app.server.utils.PasswordHasher;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    final UsersRepository repository;
    final AppCore appCore;

    public UserController(UsersRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    @GetMapping("/check")
    public boolean checkIfExists(@RequestParam("email") String email) {
        return repository.checkIfExists(email);
    }

    @GetMapping("/login")
    public boolean login() {
        User loggedUser = repository.getByCredentials("admin@admin.com", PasswordHasher.hash("admin"));
        if (loggedUser != null) {
            appCore.setCurrentUser(loggedUser);
            return true;
        }
        return false;
    }

    @PostMapping("/add")
    public boolean addUser(@RequestParam("name") String name,
                           @RequestParam("surname") String surname,
                           @RequestParam("password") String password,
                           @RequestParam("email") String email) {
        return repository.add(name, surname, password, email);
    }

    @PostMapping("/update")
    public boolean updateUser(@RequestParam("userId") int userId,
                              @RequestParam("name") String name,
                              @RequestParam("surname") String surname,
                              @RequestParam("password") String password) {
        return repository.update(userId, name, surname, password);
    }
}
