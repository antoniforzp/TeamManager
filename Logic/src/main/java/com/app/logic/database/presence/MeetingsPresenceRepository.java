package com.app.logic.database.presence;

public interface MeetingsPresenceRepository {

    int countPresent(int meetingId);

    boolean add(int meetingId, int scoutId);

    boolean delete(int meetingId, int scoutId);
}
