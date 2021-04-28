package com.app.server.database.journeysPresence;

import com.app.server.model.JourneyPresence;
import com.app.server.model.MeetingPresence;
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