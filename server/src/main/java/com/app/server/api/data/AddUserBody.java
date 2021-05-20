package com.app.server.api.data;

import com.app.server.api.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AddUserBody implements Body {

    private final String name;
    private final String surname;
    private final String password;
    private final String email;

    @JsonCreator
    public AddUserBody(@JsonProperty String name,
                       @JsonProperty String surname,
                       @JsonProperty String password,
                       @JsonProperty String email) {
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
