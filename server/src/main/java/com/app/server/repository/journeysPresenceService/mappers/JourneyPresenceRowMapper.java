package com.app.server.repository.journeysPresenceService.mappers;

import com.app.server.model.data.JourneyPresence;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class JourneyPresenceRowMapper implements RowMapper<JourneyPresence> {
    @Override
    public JourneyPresence mapRow(ResultSet resultSet, int i) throws SQLException {
        return new JourneyPresence(resultSet.getInt("journey_id"),
                resultSet.getInt("scout_id"));
    }
}