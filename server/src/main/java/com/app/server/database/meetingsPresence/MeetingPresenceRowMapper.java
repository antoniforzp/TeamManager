package com.app.server.database.meetingsPresence;

import com.app.server.model.MeetingPresence;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MeetingPresenceRowMapper implements RowMapper<MeetingPresence> {
    @Override
    public MeetingPresence mapRow(ResultSet resultSet, int i) throws SQLException {
        return new MeetingPresence(resultSet.getInt("meeting_id"),
                resultSet.getInt("scout_id"));
    }
}