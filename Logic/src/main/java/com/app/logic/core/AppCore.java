package com.app.logic.core;

import com.app.logic.model.Team;
import com.app.logic.model.User;
import org.springframework.stereotype.Component;

@Component
public class AppCore {

    private User currentUser;
    private Team currentTeam;

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        System.out.println("New current user: " + currentUser);
        this.currentUser = currentUser;
    }

    public Team getCurrentTeam() {
        return currentTeam;
    }

    public void setCurrentTeam(Team currentTeam) {
        System.out.println("New current team: " + currentTeam);
        this.currentTeam = currentTeam;
    }
}
