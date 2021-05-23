package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

@ToString
public class EditUserBody extends AddUserBody {

    @JsonCreator
    public EditUserBody(@JsonProperty String name,
                        @JsonProperty String surname,
                        @JsonProperty String password,
                        @JsonProperty String email) {
        super(name, surname, password, email);
    }
}
