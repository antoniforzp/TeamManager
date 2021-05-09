package com.app.server.model;

public class Settings implements Model {

    private final int userId;
    private final Language language;
    private final Theme theme;

    public Settings(int userId, Language language, Theme theme) {
        this.userId = userId;
        this.language = language;
        this.theme = theme;
    }


    public int getUserId() {
        return userId;
    }

    public Language getLanguage() {
        return language;
    }

    public Theme getTheme() {
        return theme;
    }

    @Override
    public String toString() {
        return "Settings{" +
                "userId=" + userId +
                ", language=" + language +
                ", theme=" + theme +
                '}';
    }
}
