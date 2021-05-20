package com.app.server.controllers;

import com.app.server.api.data.LoginBody;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.database.users.UsersRepository;
import com.app.server.model.Team;
import com.app.server.model.User;
import com.app.server.api.Response;
import com.app.server.api.data.UserCredentialsBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LoginController {

    private final UsersRepository usersRepository;
    private final TeamsRepository teamsRepository;

    public LoginController(UsersRepository usersRepository,
                           TeamsRepository teamsRepository) {
        this.usersRepository = usersRepository;
        this.teamsRepository = teamsRepository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/login")
    public Response<LoginBody> login(@RequestBody UserCredentialsBody body) {
        boolean data = usersRepository.checkCredentials(body.getEmail(), body.getPassword());
        if (data) {
            User loggedUser = usersRepository.getByCredentials(
                    body.getEmail(),
                    body.getPassword());
            List<Team> usersTeams = teamsRepository.getByUserId(loggedUser.getUserId());
            int userId = loggedUser.getUserId();
            Integer teamId = usersTeams.get(0) != null ? usersTeams.get(0).getTeamId() : null;

            return new Response<>(
                    new LoginBody(userId, teamId),
                    loggedUser.getUserId(),
                    HttpStatus.ACCEPTED);
        }

        return new Response<>(
                null,
                0,
                HttpStatus.NOT_ACCEPTABLE);
    }
}
