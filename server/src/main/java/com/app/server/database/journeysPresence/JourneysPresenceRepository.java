package com.app.server.database.journeysPresence;

import com.app.server.model.JourneyPresence;

import java.util.List;

public interface JourneysPresenceRepository {

    List<JourneyPresence> getPresenceById(int meetingId);

    List<JourneyPresence> getPresenceByTeam(int teamId);

    boolean add(int meetingId, int scoutId);

    boolean delete(int meetingId, int scoutId);
}
