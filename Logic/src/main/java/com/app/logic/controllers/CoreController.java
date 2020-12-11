package com.app.logic.controllers;

import com.app.logic.core.AppCore;
import com.app.logic.model.Team;
import com.app.logic.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/core")
public class CoreController {

    final private AppCore appCore;

    public CoreController(AppCore appCore) {
        this.appCore = appCore;
    }

    @PostMapping("/user")
    public User getCurrentUser() {
        return appCore.getCurrentUser();
    }

    @PostMapping("/team")
    public Team getCurrentTeam() {
        return appCore.getCurrentTeam();
    }
}
