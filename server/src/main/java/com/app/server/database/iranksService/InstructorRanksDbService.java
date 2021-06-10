package com.app.server.database.iranksService;

import com.app.server.database.iranksService.mapper.InstructorRankRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.IRank;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class InstructorRanksDbService implements InstructorRanksService {

    private final JdbcTemplate jdbcTemplate;

    public InstructorRanksDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Boolean add(String name, String abbreviation) {
        try {
            String QUERY = "INSERT INTO INSTRUCTOR_RANKS(name, abbreviation) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, name, abbreviation) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<IRank> getAll() {
        try {
            String QUERY = "SELECT * FROM INSTRUCTOR_RANKS";
            return jdbcTemplate.query(QUERY, new InstructorRankRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public IRank getById(int rankId) {
        try {
            String QUERY = "SELECT * FROM INSTRUCTOR_RANKS WHERE rank_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new InstructorRankRowMapper(), rankId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int rankId) {
        try {
            String QUERY = "DELETE FROM INSTRUCTOR_RANKS WHERE rank_id = ?";
            return jdbcTemplate.update(QUERY, rankId) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
