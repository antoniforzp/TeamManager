package com.app.server.api.data;

import com.app.server.api.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginBody implements Body {

    private final int userId;
    private final Integer teamId;

    @JsonCreator
    public LoginBody(@JsonProperty int userId,
                     @JsonProperty Integer teamId) {
        this.userId = userId;
        this.teamId = teamId;
    }

    public int getUserId() {
        return userId;
    }

    public Integer getTeamId() {
        return teamId;
    }
}
