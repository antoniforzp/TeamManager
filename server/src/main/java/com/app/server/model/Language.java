package com.app.server.model;

public class Language {

    private final int languageId;
    private final String name;
    private final String abbreviation;

    public Language(int languageId, String name, String abbreviation) {
        this.languageId = languageId;
        this.name = name;
        this.abbreviation = abbreviation;
    }

    public int getLanguageId() {
        return languageId;
    }

    public String getName() {
        return name;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    @Override
    public String toString() {
        return "Language{" +
                "languageId=" + languageId +
                ", name='" + name + '\'' +
                ", abbreviation='" + abbreviation + '\'' +
                '}';
    }
}
