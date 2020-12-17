package com.app.server.database.instructorRanks;

import com.app.server.model.InstructorRank;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class InstructorRankRowMapper implements RowMapper<InstructorRank> {
    @Override
    public InstructorRank mapRow(ResultSet resultSet, int i) throws SQLException {
        return new InstructorRank(resultSet.getInt("rank_id"),
                resultSet.getString("name"),
                resultSet.getString("abbreviation"));
    }
}
