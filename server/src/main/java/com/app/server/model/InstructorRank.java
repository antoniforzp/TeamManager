package com.app.server.model;

public class InstructorRank implements Model {

    private final int rankId;
    private final String name;
    private final String abbreviation;

    public InstructorRank(int rankId, String name, String abbreviation) {
        this.rankId = rankId;
        this.name = name;
        this.abbreviation = abbreviation;
    }

    public int getRankId() {
        return rankId;
    }

    public String getName() {
        return name;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    @Override
    public String toString() {
        return "InstructorRank{" +
                "rankId=" + rankId +
                ", name='" + name + '\'' +
                ", abbreviation='" + abbreviation + '\'' +
                '}';
    }
}
