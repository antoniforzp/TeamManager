package com.app.server.database.journeysService;

import com.app.server.database.journeysService.mappers.JourneyRowMapper;
import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Journey;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Repository
class JourneysDbService implements JourneysService {

    private final JdbcTemplate jdbcTemplate;

    public JourneysDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> add(String title,
                                          String place,
                                          Date startDate,
                                          Date endDate,
                                          int team_id) {
        try {
            String QUERY = "INSERT INTO JOURNEYS(title, place, start_date, end_date, team_id) VALUES(?, ?, ?, ?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, title, place, startDate, endDate, team_id) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<List<Journey>> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS WHERE team_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new JourneyRowMapper(), teamId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Journey> getById(int journeyId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS WHERE journey_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.queryForObject(QUERY, new JourneyRowMapper(), journeyId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> update(int journeyId,
                                             String title,
                                             String place,
                                             Date startDate,
                                             Date endDate) {
        try {
            String QUERY = "UPDATE JOURNEYS SET title = ?, place = ?, start_date = ?, end_date = ? WHERE journey_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, title, place, startDate, endDate, journeyId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> deleteById(int journeyId) {
        try {
            String QUERY = "DELETE FROM JOURNEYS WHERE journey_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, journeyId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
