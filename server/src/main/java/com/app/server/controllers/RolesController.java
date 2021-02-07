package com.app.server.controllers;

import com.app.server.database.roles.RolesRepository;
import com.app.server.model.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RolesController {

    private final RolesRepository repository;

    public RolesController(RolesRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @GetMapping(value = "/roles")
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(repository.getAll(), HttpStatus.ACCEPTED);
    }
}
