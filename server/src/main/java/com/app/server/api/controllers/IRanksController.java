package com.app.server.api.controllers;

import com.app.server.api.rest.response.Response;
import com.app.server.core.logic.IRanksLogic;
import com.app.server.model.data.IRank;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class IRanksController {

    private final IRanksLogic logic;

    public IRanksController(IRanksLogic logic) {
        this.logic = logic;
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/iranks")
    public Response<List<IRank>> getInstructorRanks(@PathVariable int userId) {
        return new Response<>(
                logic.getInstructorRanks(),
                userId,
                HttpStatus.ACCEPTED);
    }
}
