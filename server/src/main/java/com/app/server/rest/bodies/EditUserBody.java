package com.app.server.rest.bodies;

import com.app.server.rest.Body;

public class EditUserBody extends AddUserBody implements Body {

    public EditUserBody(String name, String surname, String password, String email) {
        super(name, surname, password, email);
    }
}
