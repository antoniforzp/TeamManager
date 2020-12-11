package com.app.logic.controllers;

import com.app.logic.database.teams.TeamsRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Component
@RequestMapping("/teams")
public class TeamsController {

    private final TeamsRepository repository;

    public TeamsController(TeamsRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/add")
    public boolean updateTeam(@RequestParam("teamId") int teamId,
                              @RequestParam("name") String name,
                              @RequestParam("patron") String patron) {
        return repository.update(teamId, name, patron);
    }

}
