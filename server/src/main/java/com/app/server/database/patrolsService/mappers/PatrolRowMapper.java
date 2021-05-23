package com.app.server.database.patrolsService.mappers;

import com.app.server.model.Patrol;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PatrolRowMapper implements RowMapper<Patrol> {
    @Override
    public Patrol mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Patrol(resultSet.getInt("patrol_id"),
                resultSet.getString("name"));
    }
}
