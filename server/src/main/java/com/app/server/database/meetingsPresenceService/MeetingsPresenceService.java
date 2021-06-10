package com.app.server.database.meetingsPresenceService;

import com.app.server.model.MeetingPresence;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface MeetingsPresenceService {

    List<MeetingPresence> getPresenceById(int meetingId);

    List<MeetingPresence> getPresenceByTeam(int teamId);

    Boolean add(int meetingId, int scoutId);

    Boolean delete(int meetingId, int scoutId);
}
