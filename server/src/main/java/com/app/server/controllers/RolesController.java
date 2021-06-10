package com.app.server.controllers;

import com.app.server.database.rolesService.RolesService;
import com.app.server.model.Role;
import com.app.server.api.Response;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class RolesController {

    private final RolesService service;

    public RolesController(RolesService service) {
        this.service = service;
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/roles")
    public Response<List<Role>> getRoles(@PathVariable int userId) {

        List<Role> data = service.getAll();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
