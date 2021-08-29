package com.app.server.api.controllers;

import com.app.server.api.rest.response.Response;
import com.app.server.api.auth.AuthRequest;
import com.app.server.api.auth.AuthResponse;
import com.app.server.api.auth.AuthResponseRejected;
import com.app.server.core.logic.LoginLogic;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class LoginController {

    private final LoginLogic logic;

    public LoginController(LoginLogic logic) {
        this.logic = logic;
    }

    @SneakyThrows
    @PostMapping(value = "/api/auth")
    public Response<AuthResponse> auth(@RequestBody AuthRequest body) {

        try {
            AuthResponse successResponse = logic.auth(body);
            return new Response<>(
                    successResponse,
                    null,
                    HttpStatus.ACCEPTED);

        } catch (BadCredentialsException exception) {

            // In case of invalid credentials, reject
            return new Response<>(
                    new AuthResponseRejected(),
                    null,
                    HttpStatus.ACCEPTED);
        }
    }
}
