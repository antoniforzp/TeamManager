package com.app.server.database.iranksService;

import com.app.server.database.iranksService.mapper.InstructorRankRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.IRank;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
class InstructorRanksDbService implements InstructorRanksService {

    private final JdbcTemplate jdbcTemplate;

    public InstructorRanksDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Async
    @Override
    public CompletableFuture<Boolean> add(String name, String abbreviation) {
        try {
            String QUERY = "INSERT INTO INSTRUCTOR_RANKS(name, abbreviation) VALUES(?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, abbreviation) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<IRank>> getAll() {
        try {
            String QUERY = "SELECT * FROM INSTRUCTOR_RANKS";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new InstructorRankRowMapper()));

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<IRank> getById(int rankId) {
        try {
            String QUERY = "SELECT * FROM INSTRUCTOR_RANKS WHERE rank_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.queryForObject(QUERY, new InstructorRankRowMapper(), rankId));

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> deleteById(int rankId) {
        try {
            String QUERY = "DELETE FROM INSTRUCTOR_RANKS WHERE rank_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, rankId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
