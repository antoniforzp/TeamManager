package com.app.server.database.meetings;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Meeting;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
class MeetingsRepositoryManager implements MeetingsRepository {

    private final JdbcTemplate jdbcTemplate;

    public MeetingsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String title, String place, Date date, int team_id) {
        try {
            String QUERY = "INSERT INTO MEETINGS(title, place, date, team_id) VALUES(?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, title, place, date, team_id) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Meeting> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM MEETINGS WHERE team_id = ?";
            return jdbcTemplate.query(QUERY, new MeetingRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Meeting getById(int meetingId) {
        try {
            String QUERY = "SELECT * FROM MEETINGS WHERE meeting_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new MeetingRowMapper(), meetingId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean update(int meetingId, String title, String place, Date date, int participants) {
        try {
            String QUERY = "UPDATE MEETINGS SET title = ?, place = ?, date = ? WHERE meeting_id = ?";
            return jdbcTemplate.update(QUERY, title, place, date, participants, meetingId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int meetingId) {
        try {
            String QUERY = "DELETE FROM MEETINGS WHERE meeting_id = ?";
            return jdbcTemplate.update(QUERY, meetingId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
