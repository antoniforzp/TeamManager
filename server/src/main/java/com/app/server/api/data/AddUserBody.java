package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
public class AddUserBody {

    @Getter
    private final String name;

    @Getter
    private final String surname;

    @Getter
    private final String password;

    @Getter
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
}
