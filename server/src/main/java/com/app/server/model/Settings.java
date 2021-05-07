package com.app.server.model;

public class Settings implements Model {

    private final int userId;
    private final Language language;

    public Settings(int userId, Language language) {
        this.userId = userId;
        this.language = language;
    }


    public int getUserId() {
        return userId;
    }

    public Language getLanguage() {
        return language;
    }

    @Override
    public String toString() {
        return "Settings{" +
                ", userId=" + userId +
                ", language='" + language + '\'' +
                '}';
    }
}
