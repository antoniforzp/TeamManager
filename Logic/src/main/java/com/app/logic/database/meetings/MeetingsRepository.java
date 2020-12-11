package com.app.logic.database.meetings;

import com.app.logic.model.Meeting;

import java.util.Date;
import java.util.List;

public interface MeetingsRepository {

    int countByTeamId(int teamId);

    boolean add(String title, String place, Date date, int members, int team_id);

    List<Meeting> getAllByTeamId(int teamId);

    Meeting getById(int meetingId);

    boolean update(int meetingId, String title, String place, Date date, int participants);

    boolean deleteById(int meetingId);
}
