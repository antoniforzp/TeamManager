package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.database.users.UsersRepository;
import com.app.server.model.Team;
import com.app.server.model.User;
import com.app.server.model.UserCredentials;
import com.app.server.utils.PasswordHasher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/login")
public class LoginController {

    private final UsersRepository usersRepository;
    private final TeamsRepository teamsRepository;
    private final AppCore appCore;

    public LoginController(UsersRepository usersRepository, TeamsRepository teamsRepository, AppCore appCore) {
        this.usersRepository = usersRepository;
        this.teamsRepository = teamsRepository;
        this.appCore = appCore;
    }

    //PUT: Login with credentials
    @CrossOrigin
    @PostMapping(value = "/login")
    public ResponseEntity<Boolean> addRole(@RequestBody UserCredentials credentials) {
        boolean check = usersRepository.checkCredentials(credentials.getEmail(), credentials.getPassword());

        //Setup core data
        if (check) {
            User loggedUser = usersRepository.getByCredentials(
                    credentials.getEmail(),
                    credentials.getPassword());
            appCore.setCurrentUser(loggedUser);

            //Assign first of assigned teams of users
            List<Team> usersTeams = teamsRepository.getByUserId(loggedUser.getUserId());
            if (!usersTeams.isEmpty()) {
                appCore.setCurrentTeam(usersTeams.get(0));
            } else {
                appCore.setCurrentTeam(new Team());
            }
        }

        return new ResponseEntity<>(check, HttpStatus.ACCEPTED);
    }
}