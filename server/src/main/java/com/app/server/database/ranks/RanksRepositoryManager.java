package com.app.server.database.ranks;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Rank;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class RanksRepositoryManager implements RanksRepository {

    private final JdbcTemplate jdbcTemplate;

    public RanksRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String name, String abbreviation, int minAge, int maxAge) {
        try {
            String QUERY = "INSERT INTO RANKS(name, abbreviation, min_age, max_age) VALUES(?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, name, abbreviation, minAge, maxAge) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Rank> getAll() {
        try {
            String QUERY = "SELECT * FROM RANKS";
            return jdbcTemplate.query(QUERY, new RankRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Rank getById(int rankId) {
        try {
            String QUERY = "SELECT * FROM RANKS WHERE rank_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new RankRowMapper(), rankId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int rankId) {
        try {
            String QUERY = "DELETE FROM RANKS WHERE rank_id = ?";
            return jdbcTemplate.update(QUERY, rankId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
