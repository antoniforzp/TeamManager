package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
public class CheckUserBody {

    @Getter
    private final String userEmail;

    @JsonCreator
    public CheckUserBody(@JsonProperty String userEmail) {
        this.userEmail = userEmail;
    }
}
