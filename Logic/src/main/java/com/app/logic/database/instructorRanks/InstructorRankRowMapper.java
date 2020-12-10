package com.app.logic.database.instructorRanks;

import com.app.logic.model.InstructorRank;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InstructorRankRowMapper implements RowMapper<InstructorRank> {
    @Override
    public InstructorRank mapRow(ResultSet resultSet, int i) throws SQLException {
        return new InstructorRank(resultSet.getInt("rank_id"),
                resultSet.getString("name"),
                resultSet.getString("abbreviation"));
    }
}
