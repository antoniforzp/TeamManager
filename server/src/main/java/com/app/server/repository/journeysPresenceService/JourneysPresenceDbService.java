package com.app.server.repository.journeysPresenceService;

import com.app.server.repository.journeysPresenceService.mappers.JourneyPresenceRowMapper;
import com.app.server.model.exceptions.DatabaseException;
import com.app.server.model.data.JourneyPresence;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class JourneysPresenceDbService implements JourneysPresenceService {

    private final JdbcTemplate jdbcTemplate;

    public JourneysPresenceDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<JourneyPresence> getPresenceById(int journeyId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS_PRESENCE WHERE journey_id = ?";
            return jdbcTemplate.query(QUERY, new JourneyPresenceRowMapper(), journeyId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<JourneyPresence> getPresenceByTeam(int teamId) {
        try {
            String QUERY = "SELECT JP.journey_id as journey_id, JP.scout_id as scout_id FROM JOURNEYS_PRESENCE JP JOIN JOURNEYS M on M.journey_id = JP.journey_id WHERE M.team_id = ?;";
            return jdbcTemplate.query(QUERY, new JourneyPresenceRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean add(int journeyId, int scoutId) {
        try {
            String QUERY = "INSERT INTO JOURNEYS_PRESENCE(journey_id, scout_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean delete(int journeyId, int scoutId) {
        try {
            String QUERY = "DELETE FROM JOURNEYS_PRESENCE WHERE journey_id = ? AND scout_id = ?";
            return jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
