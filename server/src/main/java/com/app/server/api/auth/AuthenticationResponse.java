package com.app.server.api.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

public class AuthenticationResponse {

    @Getter
    private final String status;

    @Getter
    private final Integer userId;

    @Getter
    private final Integer teamId;

    @Getter
    private final String token;

    @JsonCreator
    public AuthenticationResponse(@JsonProperty String status,
                                  @JsonProperty String token,
                                  @JsonProperty Integer userId,
                                  @JsonProperty Integer teamId) {

        this.status = status;
        this.userId = userId;
        this.teamId = teamId;
        this.token = token;
    }

}
