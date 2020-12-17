package com.app.server.database.scouts;

import com.app.server.model.InstructorRank;
import com.app.server.model.Rank;
import com.app.server.model.Scout;
import com.app.server.model.Troop;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class ScoutRowMapper implements RowMapper<Scout> {
    @Override
    public Scout mapRow(ResultSet resultSet, int i) throws SQLException {
        
        //Check instructor rank
        InstructorRank instructorRank = null;
        if (resultSet.getString("IR.name") != null ||
                resultSet.getString("IR.abbreviation") != null) {

            instructorRank = new InstructorRank(resultSet.getInt("IR.rank_id"),  //mandatory
                    resultSet.getString("IR.name"),
                    resultSet.getString("IR.abbreviation"));
        }

        return new Scout(resultSet.getInt("S.scout_id"),            //mandatory
                resultSet.getString("S.name"),                      //mandatory
                resultSet.getString("S.surname"),                   //mandatory

                resultSet.getString("S.pesel"),                     //optional...
                resultSet.getDate("S.birth_date"),
                resultSet.getString("S.address"),
                resultSet.getString("S.postal_code"),
                resultSet.getString("S.city"),
                resultSet.getString("S.phone"),

                new Troop(resultSet.getInt("T.troop_id"),           //mandatory
                        resultSet.getString("T.name")),

                new Rank(resultSet.getInt("R.rank_id"),             //mandatory
                        resultSet.getString("R.name"),
                        resultSet.getString("R.abbreviation"),
                        resultSet.getInt("R.min_age"),
                        resultSet.getInt("R.max_age")),

                instructorRank                                         //optional
        );
    }
}


