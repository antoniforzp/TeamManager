package com.app.server.database.teams;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Team;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class TeamsRepositoryManager implements TeamsRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeamsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String name, String patron, int ownerId) {
        try {
            String QUERY = "INSERT INTO TEAMS(name, patron, owner_id) VALUES(?, ?, ?)";
            return jdbcTemplate.update(QUERY, name, patron, ownerId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Team> getAll() {
        try {
            String QUERY = "SELECT * FROM TEAMS";
            return jdbcTemplate.query(QUERY, new TeamRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Team> getByUserId(int userId) {
        try {
            String QUERY = "SELECT * FROM TEAMS WHERE owner_id = ?";
            return jdbcTemplate.query(QUERY, new TeamRowMapper(), userId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Team getById(int teamId) {
        try {
            String QUERY = "SELECT * FROM TEAMS WHERE team_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new TeamRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean update(int teamID, String name, String patron) {
        try {
            String QUERY = "UPDATE TEAMS SET name = ?, patron = ? WHERE team_id = ?";
            return jdbcTemplate.update(QUERY, name, patron, teamID) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int teamId) {
        try {
            String QUERY = "DELETE FROM TEAMS WHERE team_id = ?";
            return jdbcTemplate.update(QUERY, teamId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
