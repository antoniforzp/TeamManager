package com.app.server.rest.bodies;

import com.app.server.rest.Body;

public class UserCredentialsBody implements Body {

    private final String email;
    private final String password;

    public UserCredentialsBody(String email, String password) {
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
