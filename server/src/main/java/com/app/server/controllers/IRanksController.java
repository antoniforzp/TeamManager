package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.instructorRanks.InstructorRanksRepository;
import com.app.server.model.InstructorRank;
import com.app.server.rest.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.getAll(),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
