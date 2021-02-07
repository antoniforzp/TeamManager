package com.app.server.rest.bodies;

import com.app.server.rest.Body;

public class EditTeamBody extends AddTeamBody implements Body {

    public EditTeamBody(String name, String patron) {
        super(name, patron);
    }
}
