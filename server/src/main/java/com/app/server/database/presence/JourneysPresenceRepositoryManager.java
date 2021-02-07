package com.app.server.database.presence;

import com.app.server.exceptions.DatabaseErrorException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
class JourneysPresenceRepositoryManager implements JourneysPresenceRepository {

    private final JdbcTemplate jdbcTemplate;

    public JourneysPresenceRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countPresent(int journeyId) {
        try {
            String QUERY = "SELECT COUNT(scout_id) FROM JOURNEYS_PRESENCE WHERE journey_id = ?";
            Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class, journeyId);
            if (integer == null) return 0;
            return integer;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean add(int journeyId, int scoutId) {
        try {
            String QUERY = "INSERT INTO JOURNEYS_PRESENCE(journey_id, scout_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean delete(int journeyId, int scoutId) {
        try {
            String QUERY = "DELETE FROM JOURNEYS_PRESENCE WHERE journey_id = ? AND scout_id = ?";
            return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
