package com.app.server.database.journeysService;

import com.app.server.model.Journey;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface JourneysService {

    Boolean add(String title, String place, Date startDate, Date endDate, String description, int team_id);

    List<Journey> getAllByTeamId(int teamId);

    Journey getById(int journeyId);

    Boolean update(int journeyId, String title, String place, Date startDate, Date endDate, String description);

    Boolean deleteById(int journeyId);
}
