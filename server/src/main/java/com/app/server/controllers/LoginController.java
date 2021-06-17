package com.app.server.controllers;

import com.app.server.api.auth.AuthenticationResponse;
import com.app.server.api.auth.AuthenticationRequest;
import com.app.server.api.Response;
import com.app.server.security.users.AuthUserDetailsService;
import com.app.server.security.jwt.JwtTokensManager;
import com.app.server.security.LoginStatuses;
import com.app.server.security.users.AuthUserData;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final AuthUserDetailsService userDetailsService;
    private final JwtTokensManager jwtTokensManager;

    public LoginController(AuthenticationManager authenticationManager,
                           AuthUserDetailsService userDetailsService,
                           JwtTokensManager jwtTokensManager) {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokensManager = jwtTokensManager;
    }

    @SneakyThrows
    @PostMapping(value = "/api/auth")
    public Response<AuthenticationResponse> auth(@RequestBody AuthenticationRequest body) {

        // Try to authenticate
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            body.getLogin(),
                            body.getPassword())
            );
        } catch (BadCredentialsException exception) {
            return new Response<>(
                    new AuthenticationResponse(LoginStatuses.REJECTED, null, null, null),
                    null,
                    HttpStatus.ACCEPTED);
        }

        // Process of setting up all initial auth data
        AuthUserData userData = userDetailsService.getUserDataByUsername(body.getLogin());
        String jwtAuthToken = jwtTokensManager.generateToken(userData.getUserDetails());

        Integer userId = userData.getUser() != null ? userData.getUser().getUserId() : null;
        Integer teamId = userData.getInitialTeam() != null ? userData.getInitialTeam().getTeamId() : null;

        AuthenticationResponse successResponse = new AuthenticationResponse(LoginStatuses.ACCEPTED,
                jwtAuthToken,
                userId,
                teamId);

        return new Response<>(
                successResponse,
                null,
                HttpStatus.ACCEPTED);
    }
}
