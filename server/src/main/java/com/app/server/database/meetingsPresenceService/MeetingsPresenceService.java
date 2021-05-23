package com.app.server.database.meetingsPresenceService;

import com.app.server.model.MeetingPresence;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface MeetingsPresenceService {

    CompletableFuture<List<MeetingPresence>> getPresenceById(int meetingId);

    CompletableFuture<List<MeetingPresence>> getPresenceByTeam(int teamId);

    CompletableFuture<Boolean> add(int meetingId, int scoutId);

    CompletableFuture<Boolean> delete(int meetingId, int scoutId);
}
