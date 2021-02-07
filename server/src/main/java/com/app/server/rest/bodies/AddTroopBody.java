package com.app.server.rest.bodies;

import com.app.server.rest.Body;

public class AddTroopBody implements Body {

    private final String name;

    public AddTroopBody(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
