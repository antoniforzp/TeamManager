package com.app.server.database.meetings;

import com.app.server.model.Meeting;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class MeetingRowMapper implements RowMapper<Meeting> {
    @Override
    public Meeting mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Meeting(resultSet.getInt("meeting_id"),
                resultSet.getString("title"),
                resultSet.getString("place"),
                resultSet.getDate("date"));
    }
}