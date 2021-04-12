package com.app.server.database.meetingsPresence;

import com.app.server.model.MeetingPresence;

import java.util.List;

public interface MeetingsPresenceRepository {

    List<MeetingPresence> getPresenceById(int meetingId);

    List<MeetingPresence> getPresenceByTeam(int teamId);

    boolean add(int meetingId, int scoutId);

    boolean delete(int meetingId, int scoutId);
}
