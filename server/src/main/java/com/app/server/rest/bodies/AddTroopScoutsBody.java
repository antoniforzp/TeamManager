package com.app.server.rest.bodies;

import com.app.server.rest.Body;

import java.util.List;

public class AddTroopScoutsBody implements Body {

    private final List<Integer> scoutsIds;

    public AddTroopScoutsBody(List<Integer> scoutsIds) {
        this.scoutsIds = scoutsIds;
    }

    public List<Integer> getScoutsIds() {
        return scoutsIds;
    }
}
