package com.app.server.model;

import java.util.Objects;

public class InstructorRank implements Model {

    private final int rankId;
    private final String name;
    private final String abbreviation;

//    public InstructorRank() {
//        this.rankId = 0;
//        this.name = "name";
//        this.abbreviation = "n.";
//    }

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InstructorRank that = (InstructorRank) o;
        return rankId == that.rankId && name.equals(that.name) && abbreviation.equals(that.abbreviation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rankId, name, abbreviation);
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
