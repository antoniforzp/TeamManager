package com.app.server.controllers;

import com.app.server.database.roles.RolesRepository;
import com.app.server.model.Role;
import com.app.server.api.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RolesController {

    private final RolesRepository repository;

    public RolesController(RolesRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/roles")
    public Response<List<Role>> getRoles(@PathVariable int userId) {
        List<Role> data = repository.getAll();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
