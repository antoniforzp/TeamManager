package com.app.server.database.meetingsService;

import com.app.server.database.meetingsService.mappers.MeetingRowMapper;
import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Meeting;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Repository
class MeetingsDbService implements MeetingsService {

    private final JdbcTemplate jdbcTemplate;

    public MeetingsDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> add(String title, String place, Date date, int team_id) {
        try {
            String QUERY = "INSERT INTO MEETINGS(title, place, date, team_id) VALUES(?, ?, ?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, title, place, date, team_id) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<List<Meeting>> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM MEETINGS WHERE team_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new MeetingRowMapper(), teamId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Meeting> getById(int meetingId) {
        try {
            String QUERY = "SELECT * FROM MEETINGS WHERE meeting_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.queryForObject(QUERY, new MeetingRowMapper(), meetingId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> update(int meetingId, String title, String place, Date date) {
        try {
            String QUERY = "UPDATE MEETINGS SET title = ?, place = ?, date = ? WHERE meeting_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, title, place, date, meetingId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> deleteById(int meetingId) {
        try {
            String QUERY = "DELETE FROM MEETINGS WHERE meeting_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, meetingId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}