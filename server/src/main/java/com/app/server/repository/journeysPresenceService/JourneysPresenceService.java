package com.app.server.repository.journeysPresenceService;

import com.app.server.model.data.JourneyPresence;

import java.util.List;

public interface JourneysPresenceService {

    List<JourneyPresence> getPresenceById(int meetingId);

    List<JourneyPresence> getPresenceByTeam(int teamId);

    Boolean add(int meetingId, int scoutId);

    Boolean delete(int meetingId, int scoutId);
}
