package com.app.server.database.journeys;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Journey;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
class JourneysRepositoryManager implements JourneysRepository {

    private final JdbcTemplate jdbcTemplate;

    public JourneysRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String title, String place, Date start_date, Date end_date, int type, int team_id) {
        try {
            String QUERY = "INSERT INTO JOURNEYS(title, place, start_date, end_date, type, team_id) VALUES(?, ?, ?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, title, place, start_date, end_date, type, team_id) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Journey> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS WHERE team_id = ?";
            return jdbcTemplate.query(QUERY, new JourneyRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Journey getById(int journeyId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS WHERE journey_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new JourneyRowMapper(), journeyId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean update(int journeyId, String title, String place, Date startDate, Date endDate, int participants, int type) {
        try {
            String QUERY = "UPDATE JOURNEYS SET title = ?, place = ?, start_date = ?, end_date = ?, type = ? WHERE journey_id = ?";
            return jdbcTemplate.update(QUERY, title, place, startDate, endDate, type, journeyId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int journeyId) {
        try {
            String QUERY = "DELETE FROM JOURNEYS WHERE journey_id = ?";
            return jdbcTemplate.update(QUERY, journeyId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
