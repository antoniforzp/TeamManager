package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserCredentialsBody implements Body {

    private final String email;
    private final String password;

    @JsonCreator
    public UserCredentialsBody(@JsonProperty String email,
                               @JsonProperty String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
