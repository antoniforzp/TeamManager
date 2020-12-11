package com.app.logic.database.presence;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MeetingsPresenceRepositoryManager implements MeetingsPresenceRepository {

    private final JdbcTemplate jdbcTemplate;

    public MeetingsPresenceRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countPresent(int meetingId) {
        String QUERY = "SELECT COUNT(scout_id) FROM MEETINGS_PRESENCE WHERE meeting_id=?";
        Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class, meetingId);
        if (integer == null) return 0;
        return integer;
    }

    @Override
    public boolean add(int meetingId, int scoutId) {
        String QUERY = "INSERT INTO MEETINGS_PRESENCE(meeting_id, scout_id) VALUES(?,?)";
        try {
            return jdbcTemplate.update(QUERY, meetingId, scoutId) >= 1;
        } catch (DuplicateKeyException e) {
            return false;
        }
    }

    @Override
    public boolean remove(int meetingId, int scoutId) {
        String QUERY = "DELETE FROM MEETINGS_PRESENCE WHERE meeting_id=? AND scout_id=?";
        return jdbcTemplate.update(QUERY, meetingId, scoutId) >= 1;
    }
}
