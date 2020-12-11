package com.app.logic.database.journeys;

import com.app.logic.model.Journey;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class JourneyRowMapper implements RowMapper<Journey> {
    @Override
    public Journey mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Journey(resultSet.getInt("journey_id"),
                resultSet.getString("title"),
                resultSet.getString("place"),
                resultSet.getDate("start_date"),
                resultSet.getDate("end_date"),
                resultSet.getInt("participants"),
                resultSet.getInt("type"));
    }
}
