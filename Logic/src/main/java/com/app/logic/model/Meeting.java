package com.app.logic.model;

import java.util.Date;
import java.util.Objects;

public class Meeting implements Model {

    private final int meetingId;
    private final String title;
    private final String place;
    private final Date date;
    private final int participants;

    public Meeting() {
        this.meetingId = 0;
        this.title = "title";
        this.place = "place";
        this.date = new Date();
        this.participants = 0;
    }

    public Meeting(int meetingId, String title, String place, Date date, int participants) {
        this.meetingId = meetingId;
        this.title = title;
        this.place = place;
        this.date = date;
        this.participants = participants;
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

    public int getParticipants() {
        return participants;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Meeting meeting = (Meeting) o;
        return meetingId == meeting.meetingId && title.equals(meeting.title) && place.equals(meeting.place) && date.equals(meeting.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(meetingId, title, place, date);
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
