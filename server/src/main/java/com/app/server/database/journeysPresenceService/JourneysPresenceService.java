package com.app.server.database.journeysPresenceService;

import com.app.server.model.JourneyPresence;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface JourneysPresenceService {

    CompletableFuture<List<JourneyPresence>> getPresenceById(int meetingId);

    CompletableFuture<List<JourneyPresence>> getPresenceByTeam(int teamId);

    CompletableFuture<Boolean> add(int meetingId, int scoutId);

    CompletableFuture<Boolean> delete(int meetingId, int scoutId);
}
