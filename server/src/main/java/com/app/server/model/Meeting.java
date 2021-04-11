package com.app.server.model;

import java.util.Date;

public class Meeting implements Model {

    private final int meetingId;
    private final String title;
    private final String place;
    private final Date date;

    public Meeting(int meetingId, String title, String place, Date date) {
        this.meetingId = meetingId;
        this.title = title;
        this.place = place;
        this.date = date;
    }

    public int getMeetingId() {
        return meetingId;
    }

    public String getTitle() {
        return title;
    }

    public String getPlace() {
        return place;
    }

    public Date getDate() {
        return date;
    }

    @Override
    public String toString() {
        return "Meeting{" +
                "meetingId=" + meetingId +
                ", title='" + title + '\'' +
                ", place='" + place + '\'' +
                ", date=" + date +
                '}';
    }
}
