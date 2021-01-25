package com.app.server.controllers;

import com.app.server.database.instructorRanks.InstructorRanksRepository;
import com.app.server.database.ranks.RanksRepository;
import com.app.server.database.roles.RolesRepository;
import com.app.server.model.InstructorRank;
import com.app.server.model.Rank;
import com.app.server.model.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/ranks")
public class RanksController {

    private final RanksRepository ranksRepository;
    private final InstructorRanksRepository instructorRanksRepository;

    public RanksController(RanksRepository ranksRepository, InstructorRanksRepository instructorRanksRepository) {
        this.ranksRepository = ranksRepository;
        this.instructorRanksRepository = instructorRanksRepository;
    }

    //GET: List of available ranks
    @CrossOrigin
    @GetMapping(value = "/ranks/list")
    public ResponseEntity<List<Rank>> getRanks() {
        return new ResponseEntity<>(ranksRepository.getAll(), HttpStatus.ACCEPTED);
    }

    //GET: List of available instructor ranks
    @CrossOrigin
    @GetMapping(value = "/instructors/list")
    public ResponseEntity<List<InstructorRank>> getInstructorRanks() {
        return new ResponseEntity<>(instructorRanksRepository.getAll(), HttpStatus.ACCEPTED);
    }
}
