package com.app.server.database.meetingsService;

import com.app.server.model.Meeting;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface MeetingsService {

    Boolean add(String title, String place, Date date, String description, int team_id);

    List<Meeting> getAllByTeamId(int teamId);

    Meeting getById(int meetingId);

    Boolean update(int meetingId, String title, String place, Date date, String description);

    Boolean deleteById(int meetingId);
}
