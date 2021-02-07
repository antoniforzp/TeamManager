package com.app.server.rest.bodies;

import com.app.server.rest.Body;

import java.util.List;

public class DeleteTroopScoutsBody extends AddTroopScoutsBody implements Body {

    public DeleteTroopScoutsBody(List<Integer> scoutsIds) {
        super(scoutsIds);
    }
}
