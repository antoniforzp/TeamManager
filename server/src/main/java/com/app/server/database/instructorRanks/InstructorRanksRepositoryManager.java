package com.app.server.database.instructorRanks;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.InstructorRank;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class InstructorRanksRepositoryManager implements InstructorRanksRepository {

    private final JdbcTemplate jdbcTemplate;

    public InstructorRanksRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String name, String abbreviation) {
        try {
            String QUERY = "INSERT INTO INSTRUCTOR_RANKS(name, abbreviation) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, name, abbreviation) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<InstructorRank> getAll() {
        try {
            String QUERY = "SELECT * FROM INSTRUCTOR_RANKS";
            return jdbcTemplate.query(QUERY, new InstructorRankRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public InstructorRank getById(int rankId) {
        try {
            String QUERY = "SELECT * FROM INSTRUCTOR_RANKS WHERE rank_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new InstructorRankRowMapper(), rankId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int rankId) {
        try {
            String QUERY = "DELETE FROM INSTRUCTOR_RANKS WHERE rank_id = ?";
            return jdbcTemplate.update(QUERY, rankId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
