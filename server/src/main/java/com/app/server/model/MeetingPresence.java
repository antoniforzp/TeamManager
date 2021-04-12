package com.app.server.model;

public class MeetingPresence implements Model {

    private final int meetingId;
    private final int scoutId;

    public MeetingPresence(int meetingId, int scoutId) {
        this.meetingId = meetingId;
        this.scoutId = scoutId;
    }

    public int getMeetingId() {
        return meetingId;
    }

    public int getScoutId() {
        return scoutId;
    }
}
