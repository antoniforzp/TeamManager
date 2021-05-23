package com.app.server.database.teamsService;

import com.app.server.database.teamsService.mappers.TeamRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.Team;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
class TeamsDbService implements TeamsService {

    private final JdbcTemplate jdbcTemplate;

    public TeamsDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Async
    @Override
    public CompletableFuture<Boolean> add(String name, String patron, int ownerId) {
        try {
            String QUERY = "INSERT INTO TEAMS(name, patron, owner_id) VALUES(?, ?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, patron, ownerId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<Team>> getAll() {
        try {
            String QUERY = "SELECT * FROM TEAMS";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new TeamRowMapper()));

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<Team>> getByUserId(Integer userId) {
        try {
            String QUERY = "SELECT * FROM TEAMS WHERE owner_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new TeamRowMapper(), userId));

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Team> getById(int teamId) {
        try {
            String QUERY = "SELECT * FROM TEAMS WHERE team_id = ?";
            List<Team> teams = jdbcTemplate.query(QUERY, new TeamRowMapper(), teamId);
            return CompletableFuture.completedFuture(!teams.isEmpty() ? teams.get(0) : null);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> update(int teamID,
                                             String name,
                                             String patron) {
        try {
            String QUERY = "UPDATE TEAMS SET name = ?, patron = ? WHERE team_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, patron, teamID) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> deleteById(int teamId) {
        try {
            String QUERY = "DELETE FROM TEAMS WHERE team_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, teamId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
