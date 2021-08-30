package com.app.server.core.logic;

import com.app.server.api.security.auth.AuthRequest;
import com.app.server.api.security.auth.AuthResponse;
import com.app.server.api.security.LoginStatuses;
import com.app.server.api.security.jwt.JwtTokensManager;
import com.app.server.api.security.users.AuthUserData;
import com.app.server.api.security.users.AuthUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class LoginLogic {

    private final AuthenticationManager authenticationManager;
    private final AuthUserDetailsService userDetailsService;
    private final JwtTokensManager jwtTokensManager;

    public LoginLogic(AuthenticationManager authenticationManager,
                      AuthUserDetailsService userDetailsService,
                      JwtTokensManager jwtTokensManager) {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokensManager = jwtTokensManager;
    }

    // UTILS

    public AuthResponse auth(AuthRequest body) throws BadCredentialsException {

        // Try to authenticate
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        body.getLogin(),
                        body.getPassword())
        );

        // Process of setting up all initial auth data
        AuthUserData userData = userDetailsService.getUserDataByUsername(body.getLogin());
        String jwtAuthToken = jwtTokensManager.generateToken(userData.getUserDetails());

        Integer userId = userData.getUser() != null ? userData.getUser().getUserId() : null;
        Integer teamId = userData.getInitialTeam() != null ? userData.getInitialTeam().getTeamId() : null;

        return new AuthResponse(LoginStatuses.ACCEPTED,
                jwtAuthToken,
                userId,
                teamId);
    }
}
