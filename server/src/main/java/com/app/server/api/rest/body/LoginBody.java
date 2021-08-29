package com.app.server.api.rest.body;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
public class LoginBody {

    @Getter
    private final Integer userId;

    @Getter
    private final Integer teamId;

    @JsonCreator
    public LoginBody(@JsonProperty Integer userId,
                     @JsonProperty Integer teamId) {
        this.userId = userId;
        this.teamId = teamId;
    }
}
