package com.app.server.controllers;

import com.app.server.database.roles.RolesRepository;
import com.app.server.model.Role;
import com.app.server.model.Scout;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/roles")
public class RolesController {

    private final RolesRepository repository;

    public RolesController(RolesRepository repository) {
        this.repository = repository;
    }

    //GET: List of available roles
    @CrossOrigin
    @GetMapping(value = "/list")
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(repository.getAll(), HttpStatus.ACCEPTED);
    }
}
