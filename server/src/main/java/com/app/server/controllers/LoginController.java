package com.app.server.controllers;

import com.app.server.api.data.LoginBody;
import com.app.server.database.teamsService.TeamsService;
import com.app.server.database.usersService.UsersService;
import com.app.server.api.Response;
import com.app.server.model.Team;
import com.app.server.model.User;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class LoginController {

    private final UsersService usersService;
    private final TeamsService teamsService;

    public LoginController(UsersService usersService,
                           TeamsService teamsService) {
        this.usersService = usersService;
        this.teamsService = teamsService;
    }

    @SneakyThrows
    @GetMapping(value = "/api/login/{userEmail}/{userPassword}")
    public Response<LoginBody> login(@PathVariable String userEmail,
                                     @PathVariable String userPassword) {

        Integer userId = null;
        Integer teamId = null;

        CompletableFuture<Boolean> check = usersService.checkCredentials(userEmail, userPassword);
        CompletableFuture<User> loggedUser = usersService.getByCredentials(userEmail, userPassword);
        CompletableFuture.allOf(check, loggedUser).join();

        if (check.get() && loggedUser.get() != null) {
            userId = loggedUser.get().getUserId();
            CompletableFuture<List<Team>> userTeams = teamsService.getByUserId(userId);

            if (!userTeams.get().isEmpty()) {
                teamId = userTeams.get().get(0).getTeamId();
            }
        }

        return new Response<>(
                new LoginBody(userId, teamId),
                userId,
                HttpStatus.ACCEPTED);
    }
}
