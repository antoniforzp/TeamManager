package com.app.server.database.journeysPresenceService;

import com.app.server.database.journeysPresenceService.mappers.JourneyPresenceRowMapper;
import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.JourneyPresence;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
class JourneysPresenceDbService implements JourneysPresenceService {

    private final JdbcTemplate jdbcTemplate;

    public JourneysPresenceDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Async
    @Override
    public CompletableFuture<List<JourneyPresence>> getPresenceById(int journeyId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS_PRESENCE WHERE journey_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new JourneyPresenceRowMapper(), journeyId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<JourneyPresence>> getPresenceByTeam(int teamId) {
        try {
            String QUERY = "SELECT JP.journey_id as journey_id, JP.scout_id as scout_id FROM JOURNEYS_PRESENCE JP JOIN JOURNEYS M on M.journey_id = JP.journey_id WHERE M.team_id = ?;";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new JourneyPresenceRowMapper(), teamId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> add(int journeyId, int scoutId) {
        try {
            String QUERY = "INSERT INTO JOURNEYS_PRESENCE(journey_id, scout_id) VALUES(?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> delete(int journeyId, int scoutId) {
        try {
            String QUERY = "DELETE FROM JOURNEYS_PRESENCE WHERE journey_id = ? AND scout_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, journeyId, scoutId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
