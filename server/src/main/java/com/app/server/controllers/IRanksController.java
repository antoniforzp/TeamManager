package com.app.server.controllers;

import com.app.server.database.instructorRanks.InstructorRanksRepository;
import com.app.server.model.InstructorRank;
import com.app.server.api.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IRanksController {

    private final InstructorRanksRepository repository;

    public IRanksController(InstructorRanksRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/iranks")
    public Response<List<InstructorRank>> getInstructorRanks(@PathVariable int userId) {
        List<InstructorRank> data = repository.getAll();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
