package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.model.Team;
import com.app.server.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(value = "/core")
public class CoreController {

    final private AppCore appCore;

    public CoreController(AppCore appCore) {
        this.appCore = appCore;
    }

    //PUT: Get current logged user
    @CrossOrigin
    @GetMapping(value = "/user")
    public ResponseEntity<User> getCurrentUser() {
        return new ResponseEntity<>(appCore.getCurrentUser(), HttpStatus.ACCEPTED);
    }

    //PUT: Get current chosen team
    @CrossOrigin
    @GetMapping(value = "/team")
    public ResponseEntity<Team> getCurrentTeam() {
        return new ResponseEntity<>(appCore.getCurrentTeam(), HttpStatus.ACCEPTED);
    }
}
