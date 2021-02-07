package com.app.server.rest.bodies;

import com.app.server.rest.Body;

public class CheckUserBody implements Body {

    private final String email;

    public CheckUserBody(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
