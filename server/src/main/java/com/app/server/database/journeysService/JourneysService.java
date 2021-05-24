package com.app.server.database.journeysService;

import com.app.server.model.Journey;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface JourneysService {

    CompletableFuture<Boolean> add(String title, String place, Date startDate, Date endDate, String description, int team_id);

    CompletableFuture<List<Journey>> getAllByTeamId(int teamId);

    CompletableFuture<Journey> getById(int journeyId);

    CompletableFuture<Boolean> update(int journeyId, String title, String place, Date startDate, Date endDate, String description);

    CompletableFuture<Boolean> deleteById(int journeyId);
}
