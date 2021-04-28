package com.app.server.model;

import java.util.Date;

public class Journey implements Model {

    private final int journeyId;
    private final String title;
    private final String place;
    private final Date startDate;
    private final Date endDate;

    public Journey(int journeyId, String title, String place, Date startDate, Date endDate) {
        this.journeyId = journeyId;
        this.title = title;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
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

    @Override
    public String toString() {
        return "Journey{" +
                "journeyId=" + journeyId +
                ", title='" + title + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}
