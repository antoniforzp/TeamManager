package com.app.server.database.scoutsService.mappers;

import com.app.server.model.IRank;
import com.app.server.model.Rank;
import com.app.server.model.Scout;
import com.app.server.model.Patrol;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ScoutRowMapper implements RowMapper<Scout> {
    @Override
    public Scout mapRow(ResultSet resultSet, int i) throws SQLException {

        //Check instructor rank
        IRank iRank = null;
        if (resultSet.getString("IR.name") != null ||
                resultSet.getString("IR.abbreviation") != null) {

            iRank = new IRank(resultSet.getInt("IR.rank_id"),
                    resultSet.getString("IR.name"),
                    resultSet.getString("IR.abbreviation"));
        }

        return new Scout(resultSet.getInt("S.scout_id"),
                resultSet.getString("S.name"),
                resultSet.getString("S.surname"),

                resultSet.getString("S.pesel"),
                resultSet.getDate("S.birth_date"),
                resultSet.getString("S.address"),
                resultSet.getString("S.postal_code"),
                resultSet.getString("S.city"),
                resultSet.getString("S.phone"),

                new Patrol(resultSet.getInt("P.patrol_id"),
                        resultSet.getString("P.name")),

                new Rank(resultSet.getInt("R.rank_id"),
                        resultSet.getString("R.name"),
                        resultSet.getString("R.abbreviation"),
                        resultSet.getInt("R.min_age"),
                        resultSet.getInt("R.max_age")),

                iRank
        );
    }
}


