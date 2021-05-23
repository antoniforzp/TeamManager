package com.app.server.database.iranksService.mapper;

import com.app.server.model.IRank;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InstructorRankRowMapper implements RowMapper<IRank> {
    @Override
    public IRank mapRow(ResultSet resultSet, int i) throws SQLException {
        return new IRank(resultSet.getInt("rank_id"),
                resultSet.getString("name"),
                resultSet.getString("abbreviation"));
    }
}
