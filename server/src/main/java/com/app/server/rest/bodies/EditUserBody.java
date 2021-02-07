package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EditUserBody extends AddUserBody implements Body {

    @JsonCreator
    public EditUserBody(@JsonProperty String name,
                        @JsonProperty String surname,
                        @JsonProperty String password,
                        @JsonProperty String email) {
        super(name, surname, password, email);
    }
}
