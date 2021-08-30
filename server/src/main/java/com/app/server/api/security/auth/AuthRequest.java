package com.app.server.api.security.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
public class AuthRequest {

    @Getter
    private final String login;

    @Getter
    private final String password;

    @JsonCreator
    public AuthRequest(@JsonProperty String login,
                       @JsonProperty String password) {
        this.login = login;
        this.password = password;
    }
}
