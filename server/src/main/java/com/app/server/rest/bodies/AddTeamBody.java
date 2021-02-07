package com.app.server.rest.bodies;

public class AddTeamBody {

    private final String name;
    private final String patron;

    public AddTeamBody(String name, String patron) {
        this.name = name;
        this.patron = patron;
    }

    public String getName() {
        return name;
    }

    public String getPatron() {
        return patron;
    }
}
