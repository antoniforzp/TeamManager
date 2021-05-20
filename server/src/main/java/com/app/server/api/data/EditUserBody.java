package com.app.server.api.data;

import com.app.server.api.Body;
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
