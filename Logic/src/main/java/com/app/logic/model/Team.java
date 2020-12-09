package com.app.logic.model;

import java.util.Objects;

public class Team implements Model {

    private final int team_id;
    private final String name;
    private final String patron;

    public Team() {
        this.team_id = 0;
        this.name = "name";
        this.patron = "patron";
    }

    public Team(int team_id, String name, String patron) {
        this.team_id = team_id;
        this.name = name;
        this.patron = patron;
    }

    public int getTeam_id() {
        return team_id;
    }

    public String getName() {
        return name;
    }

    public String getPatron() {
        return patron;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Team team = (Team) o;
        return team_id == team.team_id && name.equals(team.name) && patron.equals(team.patron);
    }

    @Override
    public int hashCode() {
        return Objects.hash(team_id, name, patron);
    }

    @Override
    public String toString() {
        return "Team{" +
                "team_id=" + team_id +
                ", name='" + name + '\'' +
                ", patron='" + patron + '\'' +
                '}';
    }
}
