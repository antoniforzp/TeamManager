package com.app.server.rest.bodies;

import com.app.server.rest.Body;

public class EditTroopBody extends AddTroopBody implements Body {

    public EditTroopBody(int troopId, String name) {
        super(troopId, name);
    }
}
