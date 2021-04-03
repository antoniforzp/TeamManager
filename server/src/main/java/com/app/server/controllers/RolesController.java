package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.roles.RolesRepository;
import com.app.server.model.Role;
import com.app.server.rest.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RolesController {

    private final RolesRepository repository;
    private final AppCore appCore;

    public RolesController(RolesRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @GetMapping(value = "/roles")
    public ResponseEntity<Response<List<Role>>> getRoles() {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.getAll(),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
