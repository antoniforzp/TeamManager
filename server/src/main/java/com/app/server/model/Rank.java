package com.app.server.model;

public class Rank implements Model {

    private final int rankId;
    private final String name;
    private final String abbreviation;
    private final int minAge;
    private final int maxAge;

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
    public String toString() {
        return "Rank{" +
                "rankId=" + rankId +
                ", name='" + name + '\'' +
                ", minAge=" + minAge +
                ", maxAge=" + maxAge +
                '}';
    }
}
