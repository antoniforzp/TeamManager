package com.app.server.database.troops;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Troop;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
class TroopsRepositoryManager implements TroopsRepository {

    private final JdbcTemplate jdbcTemplate;

    public TroopsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String name, int troopId) {
        try {
            String QUERY = "INSERT INTO TROOPS(name, team_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, name, troopId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Troop> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM TROOPS WHERE team_id = ?";
            return jdbcTemplate.query(QUERY, new TroopRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Troop getById(int troopId) {
        try {
            String QUERY = "SELECT * FROM TROOPS WHERE troop_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new TroopRowMapper(), troopId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean editTroop(int troopId, String name) {
        try {
            String QUERY = "UPDATE TROOPS SET name = ? WHERE troop_id = ?";
            return jdbcTemplate.update(QUERY, name, troopId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int troopId) {
        try {
            String QUERY = "DELETE FROM TROOPS WHERE troop_id = ?";
            return jdbcTemplate.update(QUERY, troopId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
