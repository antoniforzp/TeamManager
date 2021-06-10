package com.app.server.database.meetingsService;

import com.app.server.database.meetingsService.mappers.MeetingRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.Meeting;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
class MeetingsDbService implements MeetingsService {

    private final JdbcTemplate jdbcTemplate;

    public MeetingsDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Boolean add(String title,
                       String place,
                       Date date,
                       String description,
                       int team_id) {
        try {
            String QUERY = "INSERT INTO MEETINGS(title, place, date, description, team_id) VALUES(?, ?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, title, place, date, description, team_id) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Meeting> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM MEETINGS WHERE team_id = ?";
            return jdbcTemplate.query(QUERY, new MeetingRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Meeting getById(int meetingId) {
        try {
            String QUERY = "SELECT * FROM MEETINGS WHERE meeting_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new MeetingRowMapper(), meetingId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean update(int meetingId,
                          String title,
                          String place,
                          Date date,
                          String description) {
        try {
            String QUERY = "UPDATE MEETINGS SET title = ?, place = ?, date = ?, description = ? WHERE meeting_id = ?";
            return jdbcTemplate.update(QUERY, title, place, date, description, meetingId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int meetingId) {
        try {
            String QUERY = "DELETE FROM MEETINGS WHERE meeting_id = ?";
            return jdbcTemplate.update(QUERY, meetingId) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
