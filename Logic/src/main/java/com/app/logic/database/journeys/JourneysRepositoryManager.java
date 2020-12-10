package com.app.logic.database.journeys;

import com.app.logic.model.Journey;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class JourneysRepositoryManager implements JourneysRepository {

    private final JdbcTemplate jdbcTemplate;

    public JourneysRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countByTeamId(int teamId) {
        String QUERY = "SELECT COUNT(journey_id) FROM JOURNEYS WHERE team_id=?";
        Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class, teamId);
        if (integer == null) return 0;
        return integer;
    }

    @Override
    public boolean add(String title, String place, Date start_date, Date end_date, int members, int type, int team_id) {
        String QUERY = "INSERT INTO JOURNEYS(title, place, start_date, end_date, participants, type, team_id) " +
                "VALUES(?,?,?,?,?,?,?)";
        return jdbcTemplate.update(QUERY, title, place, start_date, end_date, members, type, team_id) >= 1;
    }

    @Override
    public List<Journey> getAllByTeamId(int teamId) {
        String QUERY = "SELECT * FROM JOURNEYS WHERE team_id=?";
        return jdbcTemplate.query(QUERY, new JourneyRowMapper(), teamId);
    }

    @Override
    public Journey getById(int journeyId) {
        String QUERY = "SELECT * FROM JOURNEYS WHERE journey_id=?";
        Journey journey;
        try {
            journey = jdbcTemplate.queryForObject(QUERY, new JourneyRowMapper(), journeyId);
        } catch (DataAccessException e) {
            return null;
        }
        return journey;
    }

    @Override
    public boolean update(int journeyId, String title, String place, Date startDate, Date endDate, int participants, int type) {
        String QUERY = "UPDATE JOURNEYS SET title=?, place=?, start_date=?, end_date=?, participants=?, type=? WHERE journey_id=?";
        return jdbcTemplate.update(QUERY, title, place, startDate, endDate, participants, type, journeyId) >= 1;
    }

    @Override
    public boolean deleteById(int journeyId) {
        String QUERY = "DELETE FROM JOURNEYS WHERE journey_id=?";
        return jdbcTemplate.update(QUERY, journeyId) >= 1;
    }
}
