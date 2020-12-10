package com.app.logic.database.troops;

import com.app.logic.model.Troop;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TroopRowMapper implements RowMapper<Troop> {
    @Override
    public Troop mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Troop(resultSet.getInt("troop_id"),
                resultSet.getString("name"));
    }
}
