package com.app.server.database.patrols;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Patrol;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
class PatrolRepositoryManager implements PatrolRepository {

    private final JdbcTemplate jdbcTemplate;

    public PatrolRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String name, int patrolId) {
        try {
            String QUERY = "INSERT INTO PATROLS(name, team_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, name, patrolId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Patrol> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM PATROLS WHERE team_id = ?";
            return jdbcTemplate.query(QUERY, new PatrolRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Patrol getById(int patrolId) {
        try {
            String QUERY = "SELECT * FROM PATROLS WHERE patrol_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new PatrolRowMapper(), patrolId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean edit(int patrolId, String name) {
        try {
            String QUERY = "UPDATE PATROLS SET name = ? WHERE patrol_id = ?";
            return jdbcTemplate.update(QUERY, name, patrolId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int patrolId) {
        try {
            String QUERY = "DELETE FROM PATROLS WHERE patrol_id = ?";
            return jdbcTemplate.update(QUERY, patrolId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
