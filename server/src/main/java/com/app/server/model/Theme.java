package com.app.server.model;

public class Theme implements Model {

    private final int themeId;
    private final String name;
    private final String abbreviation;

    public Theme(int themeId, String name, String abbreviation) {
        this.themeId = themeId;
        this.name = name;
        this.abbreviation = abbreviation;
    }

    public int getThemeId() {
        return themeId;
    }

    public String getName() {
        return name;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    @Override
    public String toString() {
        return "Theme{" +
                "themeId=" + themeId +
                ", name='" + name + '\'' +
                ", abbreviation='" + abbreviation + '\'' +
                '}';
    }
}
