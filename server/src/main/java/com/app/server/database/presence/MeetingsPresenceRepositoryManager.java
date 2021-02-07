package com.app.server.database.presence;

import com.app.server.exceptions.DatabaseErrorException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
class MeetingsPresenceRepositoryManager implements MeetingsPresenceRepository {

    private final JdbcTemplate jdbcTemplate;

    public MeetingsPresenceRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countPresent(int meetingId) {
        try {
            String QUERY = "SELECT COUNT(scout_id) FROM MEETINGS_PRESENCE WHERE meeting_id = ?";
            Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class, meetingId);
            if (integer == null) return 0;
            return integer;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean add(int meetingId, int scoutId) {
        try {
            String QUERY = "INSERT INTO MEETINGS_PRESENCE(meeting_id, scout_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, meetingId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean delete(int meetingId, int scoutId) {
        try {
            String QUERY = "DELETE FROM MEETINGS_PRESENCE WHERE meeting_id = ? AND scout_id = ?";
            return jdbcTemplate.update(QUERY, meetingId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
