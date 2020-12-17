package com.app.server.model;

import java.util.Objects;

public class Team implements Model {

    private final int teamId;
    private final String name;
    private final String patron;

    public Team() {
        this.teamId = 0;
        this.name = "name";
        this.patron = "patron";
    }

    public Team(int teamId, String name, String patron) {
        this.teamId = teamId;
        this.name = name;
        this.patron = patron;
    }

    public int getTeamId() {
        return teamId;
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
        return teamId == team.teamId && name.equals(team.name) && patron.equals(team.patron);
    }

    @Override
    public int hashCode() {
        return Objects.hash(teamId, name, patron);
    }

    @Override
    public String toString() {
        return "Team{" +
                "team_id=" + teamId +
                ", name='" + name + '\'' +
                ", patron='" + patron + '\'' +
                '}';
    }
}
