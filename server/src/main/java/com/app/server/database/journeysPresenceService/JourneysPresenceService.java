package com.app.server.database.journeysPresenceService;

import com.app.server.model.JourneyPresence;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface JourneysPresenceService {

    List<JourneyPresence> getPresenceById(int meetingId);

    List<JourneyPresence> getPresenceByTeam(int teamId);

    Boolean add(int meetingId, int scoutId);

    Boolean delete(int meetingId, int scoutId);
}
