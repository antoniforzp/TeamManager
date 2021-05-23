package com.app.server.database.meetingsService;

import com.app.server.model.Meeting;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface MeetingsService {

    CompletableFuture<Boolean> add(String title, String place, Date date, int team_id);

    CompletableFuture<List<Meeting>> getAllByTeamId(int teamId);

    CompletableFuture<Meeting> getById(int meetingId);

    CompletableFuture<Boolean> update(int meetingId, String title, String place, Date date);

    CompletableFuture<Boolean> deleteById(int meetingId);
}
