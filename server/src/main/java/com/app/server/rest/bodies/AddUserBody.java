package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;

public class AddUserBody implements Body {

    private final String name;
    private final String surname;
    private final String password;
    private final String email;

    @JsonCreator
    public AddUserBody(String name, String surname, String password, String email) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}
