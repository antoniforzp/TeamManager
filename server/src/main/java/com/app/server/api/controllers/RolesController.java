package com.app.server.api.controllers;

import com.app.server.core.logic.RolesLogic;
import com.app.server.model.data.Role;
import com.app.server.api.rest.response.Response;
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

    private final RolesLogic logic;

    public RolesController(RolesLogic logic) {
        this.logic = logic;
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/roles")
    public Response<List<Role>> getRoles(@PathVariable int userId) {

        List<Role> data = logic.getRoles();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
