package com.app.logic.model;

import java.util.Date;
import java.util.Objects;

public class Journey implements Model {

    private final int journeyId;
    private final String title;
    private final String place;
    private final Date startDate;
    private final Date endDate;
    private final int members;
    private final int type;

    public Journey() {
        this.journeyId = 0;
        this.title = "title";
        this.place = "place";
        this.startDate = new Date();
        this.endDate = new Date();
        this.members = 0;
        this.type = 0;
    }

    public Journey(int journeyId, String title, String place, Date startDate, Date endDate, int members, int type) {
        this.journeyId = journeyId;
        this.title = title;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
        this.members = members;
        this.type = type;
    }

    public int getJourneyId() {
        return journeyId;
    }

    public String getTitle() {
        return title;
    }

    public String getPlace() {
        return place;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public int getMembers() {
        return members;
    }

    public int getType() {
        return type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Journey journey = (Journey) o;
        return journeyId == journey.journeyId && members == journey.members && title.equals(journey.title) && startDate.equals(journey.startDate) && endDate.equals(journey.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(journeyId, title, startDate, endDate, members);
    }

    @Override
    public String toString() {
        return "Journey{" +
                "journeyId=" + journeyId +
                ", title='" + title + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", members=" + members +
                '}';
    }
}
