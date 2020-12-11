package com.app.logic.database.troops;

import com.app.logic.model.Troop;
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
        String QUERY = "INSERT INTO TROOPS(name, team_id) VALUES(?,?)";
        return jdbcTemplate.update(QUERY, name, troopId) >= 1;
    }

    @Override
    public List<Troop> getAllByTeamId(int teamId) {
        String QUERY = "SELECT * FROM TROOPS WHERE team_id=?";
        return jdbcTemplate.query(QUERY, new TroopRowMapper(), teamId);
    }

    @Override
    public Troop getById(int troopId) {
        String QUERY = "SELECT * FROM TROOPS WHERE troop_id=?";
        Troop troop;
        try {
            troop = jdbcTemplate.queryForObject(QUERY, new TroopRowMapper(), troopId);
        } catch (DataAccessException e) {
            return null;
        }
        return troop;
    }

    @Override
    public boolean deleteById(int troopId) {
        String QUERY = "DELETE FROM TROOPS WHERE troop_id=?";
        return jdbcTemplate.update(QUERY, troopId) >= 1;
    }
}
