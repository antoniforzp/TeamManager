package com.app.server.database.meetings;

import com.app.server.model.Meeting;

import java.util.Date;
import java.util.List;

public interface MeetingsRepository {

    boolean add(String title, String place, Date date, int team_id);

    List<Meeting> getAllByTeamId(int teamId);

    Meeting getById(int meetingId);

    boolean update(int meetingId, String title, String place, Date date);

    boolean deleteById(int meetingId);
}
