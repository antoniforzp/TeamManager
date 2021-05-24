package com.app.server.database.journeysService.mappers;

import com.app.server.model.Journey;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class JourneyRowMapper implements RowMapper<Journey> {
    @Override
    public Journey mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Journey(resultSet.getInt("journey_id"),
                resultSet.getString("title"),
                resultSet.getString("place"),
                resultSet.getDate("start_date"),
                resultSet.getDate("end_date"),
                resultSet.getString("description"));
    }
}
