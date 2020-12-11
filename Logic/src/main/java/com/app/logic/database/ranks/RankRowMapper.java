package com.app.logic.database.ranks;

import com.app.logic.model.Rank;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class RankRowMapper implements RowMapper<Rank> {
    @Override
    public Rank mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Rank(resultSet.getInt("rank_id"),
                resultSet.getString("name"),
                resultSet.getString("abbreviation"),
                resultSet.getInt("min_age"),
                resultSet.getInt("max_age"));
    }
}
