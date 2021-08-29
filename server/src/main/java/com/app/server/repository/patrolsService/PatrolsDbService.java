package com.app.server.repository.patrolsService;

import com.app.server.repository.patrolsService.mappers.PatrolRowMapper;
import com.app.server.model.exceptions.DatabaseException;
import com.app.server.model.data.Patrol;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
class PatrolsDbService implements PatrolsService {

    private final JdbcTemplate jdbcTemplate;

    public PatrolsDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Boolean add(String name, int teamId) {
        try {
            String QUERY = "INSERT INTO PATROLS(name, team_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, name, teamId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Patrol> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM PATROLS WHERE team_id = ?";
            return jdbcTemplate.query(QUERY, new PatrolRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Patrol getById(int patrolId) {
        try {
            String QUERY = "SELECT * FROM PATROLS WHERE patrol_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new PatrolRowMapper(), patrolId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean update(int patrolId, String name) {
        try {
            String QUERY = "UPDATE PATROLS SET name = ? WHERE patrol_id = ?";
            return jdbcTemplate.update(QUERY, name, patrolId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int patrolId) {
        try {
            String QUERY = "DELETE FROM PATROLS WHERE patrol_id = ?";
            return jdbcTemplate.update(QUERY, patrolId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
