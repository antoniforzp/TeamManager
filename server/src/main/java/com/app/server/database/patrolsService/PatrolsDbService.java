package com.app.server.database.patrolsService;

import com.app.server.database.patrolsService.mappers.PatrolRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.Patrol;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Repository
public
class PatrolsDbService implements PatrolsService {

    private final JdbcTemplate jdbcTemplate;

    public PatrolsDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Async
    @Override
    public CompletableFuture<Boolean> add(String name, int patrolId) {
        try {
            String QUERY = "INSERT INTO PATROLS(name, team_id) VALUES(?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, patrolId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<Patrol>> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM PATROLS WHERE team_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new PatrolRowMapper(), teamId));

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Patrol> getById(int patrolId) {
        try {
            String QUERY = "SELECT * FROM PATROLS WHERE patrol_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.queryForObject(QUERY, new PatrolRowMapper(), patrolId));

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> update(int patrolId, String name) {
        try {
            String QUERY = "UPDATE PATROLS SET name = ? WHERE patrol_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, patrolId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> deleteById(int patrolId) {
        try {
            String QUERY = "DELETE FROM PATROLS WHERE patrol_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, patrolId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
