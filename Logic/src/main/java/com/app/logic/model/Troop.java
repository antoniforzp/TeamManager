package com.app.logic.model;

import java.util.Objects;

public class Troop implements Model {

    private final int troopId;
    private final String name;

    public Troop() {
        this.troopId = 0;
        this.name = "name";
    }

    public Troop(int troopId, String name) {
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Troop troop = (Troop) o;
        return troopId == troop.troopId && name.equals(troop.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(troopId, name);
    }

    @Override
    public String toString() {
        return "Troop{" +
                "troopId=" + troopId +
                ", name='" + name + '\'' +
                '}';
    }
}
