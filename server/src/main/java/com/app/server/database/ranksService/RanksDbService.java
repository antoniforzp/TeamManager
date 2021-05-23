package com.app.server.database.ranksService;

import com.app.server.database.ranksService.mappers.RankRowMapper;
import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Rank;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
class RanksDbService implements RanksRepository {

    private final JdbcTemplate jdbcTemplate;

    public RanksDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Async
    @Override
    public CompletableFuture<Boolean> add(String name, String abbreviation, int minAge, int maxAge) {
        try {
            String QUERY = "INSERT INTO RANKS(name, abbreviation, min_age, max_age) VALUES(?, ?, ?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, abbreviation, minAge, maxAge) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<Rank>> getAll() {
        try {
            String QUERY = "SELECT * FROM RANKS";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new RankRowMapper()));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Rank> getById(int rankId) {
        try {
            String QUERY = "SELECT * FROM RANKS WHERE rank_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.queryForObject(QUERY, new RankRowMapper(), rankId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> deleteById(int rankId) {
        try {
            String QUERY = "DELETE FROM RANKS WHERE rank_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, rankId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
