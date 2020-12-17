package com.app.server.database.troops;

import com.app.server.model.Troop;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class TroopRowMapper implements RowMapper<Troop> {
    @Override
    public Troop mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Troop(resultSet.getInt("troop_id"),
                resultSet.getString("name"));
    }
}
