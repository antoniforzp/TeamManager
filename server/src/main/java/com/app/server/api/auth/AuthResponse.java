package com.app.server.api.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

public class AuthResponse {

    @Getter
    protected final String status;

    @Getter
    protected final Integer userId;

    @Getter
    protected final Integer teamId;

    @Getter
    protected final String token;

    @JsonCreator
    public AuthResponse(@JsonProperty String status,
                        @JsonProperty String token,
                        @JsonProperty Integer userId,
                        @JsonProperty Integer teamId) {

        this.status = status;
        this.userId = userId;
        this.teamId = teamId;
        this.token = token;
    }
}
