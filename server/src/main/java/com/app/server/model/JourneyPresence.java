package com.app.server.model;

public class JourneyPresence implements Model {

    private final int journeyId;
    private final int scoutId;

    public JourneyPresence(int journeyId, int scoutId) {
        this.journeyId = journeyId;
        this.scoutId = scoutId;
    }

    public int getJourneyId() {
        return journeyId;
    }

    public int getScoutId() {
        return scoutId;
    }
}
