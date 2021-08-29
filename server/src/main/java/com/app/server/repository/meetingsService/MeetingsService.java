package com.app.server.repository.meetingsService;

import com.app.server.model.data.Meeting;

import java.util.Date;
import java.util.List;

public interface MeetingsService {

    Boolean add(String title, String place, Date date, String description, int team_id);

    List<Meeting> getAllByTeamId(int teamId);

    Meeting getById(int meetingId);

    Boolean update(int meetingId, String title, String place, Date date, String description);

    Boolean deleteById(int meetingId);
}
