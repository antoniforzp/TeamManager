package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.instructorRanks.InstructorRanksRepository;
import com.app.server.model.InstructorRank;
import com.app.server.rest.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class IRanksController {

    private final AppCore appCore;
    private final InstructorRanksRepository repository;

    public IRanksController(AppCore appCore, InstructorRanksRepository repository) {
        this.appCore = appCore;
        this.repository = repository;
    }

    @CrossOrigin
    @GetMapping(value = "/iranks")
    public ResponseEntity<Response<List<InstructorRank>>> getInstructorRanks() {
        return new ResponseEntity<>(new Response<>(
                repository.getAll(),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
