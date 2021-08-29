package com.app.server.repository.ranksService.mappers;

import com.app.server.model.data.Rank;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RankRowMapper implements RowMapper<Rank> {
    @Override
    public Rank mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Rank(resultSet.getInt("rank_id"),
                resultSet.getString("name"),
                resultSet.getString("abbreviation"),
                resultSet.getInt("min_age"),
                resultSet.getInt("max_age"));
    }
}
