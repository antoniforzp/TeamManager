package com.app.server.database.journeys;

import com.app.server.model.Journey;

import java.util.Date;
import java.util.List;

public interface JourneysRepository {

    boolean add(String title, String place, Date startDate, Date endDate, int team_id);

    List<Journey> getAllByTeamId(int teamId);

    Journey getById(int journeyId);

    boolean update(int journeyId, String title, String place, Date startDate, Date endDate);

    boolean deleteById(int journeyId);
}
