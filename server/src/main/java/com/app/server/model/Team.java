package com.app.server.model;

public class Team implements Model {

    private final int teamId;
    private final String name;
    private final String patron;

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
    public String toString() {
        return "Team{" +
                "team_id=" + teamId +
                ", name='" + name + '\'' +
                ", patron='" + patron + '\'' +
                '}';
    }
}
