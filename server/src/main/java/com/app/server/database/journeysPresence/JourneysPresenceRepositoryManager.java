package com.app.server.database.journeysPresence;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.JourneyPresence;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class JourneysPresenceRepositoryManager implements JourneysPresenceRepository {

    private final JdbcTemplate jdbcTemplate;

    public JourneysPresenceRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<JourneyPresence> getPresenceById(int journeyId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS_PRESENCE WHERE journey_id = ?";
            return jdbcTemplate.query(QUERY, new JourneyPresenceRowMapper(), journeyId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<JourneyPresence> getPresenceByTeam(int teamId) {
        try {
            String QUERY = "SELECT JP.journey_id as journey_id, JP.scout_id as scout_id FROM JOURNEYS_PRESENCE JP JOIN JOURNEYS M on M.journey_id = JP.journey_id WHERE M.team_id = ?;";
            return jdbcTemplate.query(QUERY, new JourneyPresenceRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean add(int journeyId, int scoutId) {
        try {
            String QUERY = "INSERT INTO JOURNEYS_PRESENCE(journey_id, scout_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean delete(int journeyId, int scoutId) {
        try {
            String QUERY = "DELETE FROM JOURNEYS_PRESENCE WHERE journey_id = ? AND scout_id = ?";
            return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;
        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
