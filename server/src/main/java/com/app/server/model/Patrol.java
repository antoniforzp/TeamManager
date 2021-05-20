package com.app.server.model;

public class Patrol implements Model {

    private final int troopId;
    private final String name;

    public Patrol(int troopId, String name) {
        this.troopId = troopId;
        this.name = name;
    }

    public int getTroopId() {
        return troopId;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Troop{" +
                "troopId=" + troopId +
                ", name='" + name + '\'' +
                '}';
    }
}
