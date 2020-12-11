package com.app.logic.database.presence;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JourneysPresenceRepositoryManager implements JourneysPresenceRepository {

    private final JdbcTemplate jdbcTemplate;

    public JourneysPresenceRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countPresent(int journeyId) {
        String QUERY = "SELECT COUNT(scout_id) FROM JOURNEYS_PRESENCE WHERE journey_id=?";
        Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class, journeyId);
        if (integer == null) return 0;
        return integer;
    }

    @Override
    public boolean add(int journeyId, int scoutId) {
        String QUERY = "INSERT INTO JOURNEYS_PRESENCE(journey_id, scout_id) VALUES(?,?)";
        try {
            return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;
        } catch (DuplicateKeyException e) {
            return false;
        }
    }

    @Override
    public boolean remove(int journeyId, int scoutId) {
        String QUERY = "DELETE FROM JOURNEYS_PRESENCE WHERE journey_id=? AND scout_id=?";
        return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;
    }
}
