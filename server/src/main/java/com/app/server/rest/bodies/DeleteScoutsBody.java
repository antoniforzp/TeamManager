package com.app.server.rest.bodies;

import com.app.server.rest.Body;

import java.util.List;

public class DeleteScoutsBody implements Body {

    private final List<Integer> scoutIds;

    public DeleteScoutsBody(List<Integer> scoutIds) {
        this.scoutIds = scoutIds;
    }

    public List<Integer> getScoutIds() {
        return scoutIds;
    }
}
