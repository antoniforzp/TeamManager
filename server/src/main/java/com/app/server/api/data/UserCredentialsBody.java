package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
public class UserCredentialsBody {

    @Getter
    private final String email;

    @Getter
    private final String password;

    @JsonCreator
    public UserCredentialsBody(@JsonProperty String email,
                               @JsonProperty String password) {
        this.email = email;
        this.password = password;
    }
}
