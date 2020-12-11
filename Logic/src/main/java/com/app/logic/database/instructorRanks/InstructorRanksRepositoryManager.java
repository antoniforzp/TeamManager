package com.app.logic.database.instructorRanks;

import com.app.logic.model.InstructorRank;
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
        String QUERY = "INSERT INTO INSTRUCTOR_RANKS(name, abbreviation) VALUES(?,?)";
        return jdbcTemplate.update(QUERY, name, abbreviation) >= 1;
    }

    @Override
    public List<InstructorRank> getAll() {
        String QUERY = "SELECT * FROM INSTRUCTOR_RANKS";
        return jdbcTemplate.query(QUERY, new InstructorRankRowMapper());
    }

    @Override
    public InstructorRank getById(int rankId) {
        String QUERY = "SELECT * FROM INSTRUCTOR_RANKS WHERE rank_id=?";
        InstructorRank rank;
        try {
            rank = jdbcTemplate.queryForObject(QUERY, new InstructorRankRowMapper(), rankId);
        } catch (DataAccessException e) {
            return null;
        }
        return rank;
    }

    @Override
    public boolean deleteById(int rankId) {
        String QUERY = "DELETE FROM INSTRUCTOR_RANKS WHERE rank_id=?";
        return jdbcTemplate.update(QUERY, rankId) >= 1;
    }
}
