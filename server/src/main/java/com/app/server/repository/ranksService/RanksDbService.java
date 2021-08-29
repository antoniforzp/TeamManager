package com.app.server.repository.ranksService;

import com.app.server.repository.ranksService.mappers.RankRowMapper;
import com.app.server.model.exceptions.DatabaseException;
import com.app.server.model.data.Rank;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class RanksDbService implements RanksRepository {

    private final JdbcTemplate jdbcTemplate;

    public RanksDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Boolean add(String name, String abbreviation, int minAge, int maxAge) {
        try {
            String QUERY = "INSERT INTO RANKS(name, abbreviation, min_age, max_age) VALUES(?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, name, abbreviation, minAge, maxAge) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Rank> getAll() {
        try {
            String QUERY = "SELECT * FROM RANKS";
            return jdbcTemplate.query(QUERY, new RankRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Rank getById(int rankId) {
        try {
            String QUERY = "SELECT * FROM RANKS WHERE rank_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new RankRowMapper(), rankId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int rankId) {
        try {
            String QUERY = "DELETE FROM RANKS WHERE rank_id = ?";
            return jdbcTemplate.update(QUERY, rankId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
