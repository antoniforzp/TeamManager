package com.app.logic.controllers;

import com.app.logic.core.AppCore;
import com.app.logic.database.users.UsersRepository;
import com.app.logic.model.User;
import com.app.logic.utils.PasswordHasher;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    final UsersRepository repository;
    final AppCore appCore;

    public UserController(UsersRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    @PostMapping("/login")
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

    @GetMapping("/current")
    public User getUser() {
        return appCore.getCurrentUser();
    }
}
