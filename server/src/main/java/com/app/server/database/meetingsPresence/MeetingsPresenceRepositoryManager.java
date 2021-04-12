package com.app.server.database.meetingsPresence;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.MeetingPresence;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class MeetingsPresenceRepositoryManager implements MeetingsPresenceRepository {

    private final JdbcTemplate jdbcTemplate;

    public MeetingsPresenceRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<MeetingPresence> getPresenceById(int meetingId) {
        try {
            String QUERY = "SELECT * FROM MEETINGS_PRESENCE WHERE meeting_id = ?";
            return jdbcTemplate.query(QUERY, new MeetingPresenceRowMapper(), meetingId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<MeetingPresence> getPresenceByTeam(int teamId) {
        try {
            String QUERY = "SELECT MP.meeting_id as meeting_id, MP.scout_id as scout_id FROM MEETINGS_PRESENCE MP JOIN MEETINGS M on M.meeting_id = MP.meeting_id WHERE M.team_id = ?;";
            return jdbcTemplate.query(QUERY, new MeetingPresenceRowMapper(), teamId);

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
