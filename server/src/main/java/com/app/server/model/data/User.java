package com.app.server.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class User {

    @Getter
    private final int userId;

    @Getter
    private final String name;

    @Getter
    private final String surname;

    @Getter
    private final String password;

    @Getter
    private final String email;
}
