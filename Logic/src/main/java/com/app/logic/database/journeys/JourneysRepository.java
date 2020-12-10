package com.app.logic.database.journeys;

import com.app.logic.model.Journey;

import java.util.Date;
import java.util.List;

public interface JourneysRepository {

    int countByTeamId(int teamId);

    boolean add(String title, String place, Date start_date, Date end_date, int members, int type, int team_id);

    List<Journey> getAllByTeamId(int teamId);

    Journey getById(int journeyId);

    boolean update(int journeyId, String title, String place, Date startDate, Date endDate, int participants, int type);

    boolean deleteById(int journeyId);
}
