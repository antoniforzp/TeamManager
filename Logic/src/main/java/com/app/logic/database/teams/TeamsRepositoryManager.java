package com.app.logic.database.teams;

import com.app.logic.model.Team;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TeamsRepositoryManager implements TeamsRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeamsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int count() {
        String QUERY = "SELECT COUNT(team_id) FROM TEAMS";
        Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class);
        if (integer == null) return 0;
        return integer;
    }

    @Override
    public boolean add(String name, String patron, int ownerId) {
        String QUERY = "INSERT INTO TEAMS(name, patron, owner_id) VALUES(?,?,?)";
        return jdbcTemplate.update(QUERY, name, patron, ownerId) >= 1;
    }

    @Override
    public List<Team> getAll() {
        String QUERY = "SELECT * FROM TEAMS";
        return jdbcTemplate.query(QUERY, new TeamRowMapper());
    }

    @Override
    public List<Team> getByUserId(int userId) {
        String QUERY = "SELECT * FROM TEAMS WHERE owner_id=?";
        return jdbcTemplate.query(QUERY, new TeamRowMapper(), userId);
    }

    @Override
    public Team getById(int teamId) {
        String QUERY = "SELECT * FROM TEAMS WHERE team_id=?";
        Team team;
        try {
            team = jdbcTemplate.queryForObject(QUERY, new TeamRowMapper(), teamId);
        } catch (DataAccessException e) {
            return null;
        }
        return team;
    }

    @Override
    public boolean update(int teamID, String name, String patron) {
        String QUERY = "UPDATE TEAMS SET name=?, patron=? WHERE team_id=?";
        return jdbcTemplate.update(QUERY, name, patron, teamID) >= 1;
    }

    @Override
    public boolean deleteById(int teamId) {
        String QUERY = "DELETE FROM TEAMS WHERE team_id=?";
        return jdbcTemplate.update(QUERY, teamId) >= 1;
    }
}
