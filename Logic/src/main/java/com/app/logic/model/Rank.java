package com.app.logic.model;

import java.util.Objects;

public class Rank implements Model {

    private final int rankId;
    private final String name;
    private final String abbreviation;
    private final int minAge;
    private final int maxAge;

    public Rank() {
        this.rankId = 0;
        this.name = "name";
        this.abbreviation = "n.";
        this.minAge = 0;
        this.maxAge = 100;
    }

    public Rank(int rankId, String name, String abbreviation, int minAge, int maxAge) {
        this.rankId = rankId;
        this.name = name;
        this.abbreviation = abbreviation;
        this.minAge = minAge;
        this.maxAge = maxAge;
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

    public int getMinAge() {
        return minAge;
    }

    public int getMaxAge() {
        return maxAge;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Rank rank = (Rank) o;
        return rankId == rank.rankId && minAge == rank.minAge && maxAge == rank.maxAge && name.equals(rank.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rankId, name, minAge, maxAge);
    }

    @Override
    public String toString() {
        return "Rank{" +
                "rankId=" + rankId +
                ", name='" + name + '\'' +
                ", minAge=" + minAge +
                ", maxAge=" + maxAge +
                '}';
    }


}
