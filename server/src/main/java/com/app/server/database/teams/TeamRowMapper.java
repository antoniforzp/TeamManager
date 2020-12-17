package com.app.server.database.teams;

import com.app.server.model.Team;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class TeamRowMapper implements RowMapper<Team> {
    @Override
    public Team mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Team(resultSet.getInt("team_id"),
                resultSet.getString("name"),
                resultSet.getString("patron"));
    }
}
