package com.app.server.core;

import com.app.server.exceptions.TeamNotSetException;
import com.app.server.exceptions.UserNotSetException;
import com.app.server.model.Team;
import com.app.server.model.User;
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

    public void checkCoreInit() {
        if (currentUser == null) throw new UserNotSetException();
        else if (currentTeam == null) throw new TeamNotSetException();
    }
}
