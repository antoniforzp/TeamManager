package com.app.server.repository.meetingsPresenceService;

import com.app.server.model.data.MeetingPresence;

import java.util.List;

public interface MeetingsPresenceService {

    List<MeetingPresence> getPresenceById(int meetingId);

    List<MeetingPresence> getPresenceByTeam(int teamId);

    Boolean add(int meetingId, int scoutId);

    Boolean delete(int meetingId, int scoutId);
}
