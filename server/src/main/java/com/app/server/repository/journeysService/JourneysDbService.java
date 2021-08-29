package com.app.server.repository.journeysService;

import com.app.server.repository.journeysService.mappers.JourneyRowMapper;
import com.app.server.model.exceptions.DatabaseException;
import com.app.server.model.data.Journey;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
class JourneysDbService implements JourneysService {

    private final JdbcTemplate jdbcTemplate;

    public JourneysDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Boolean add(String title,
                       String place,
                       Date startDate,
                       Date endDate,
                       String description,
                       int team_id) {

        try {
            String QUERY = "INSERT INTO JOURNEYS(title, place, start_date, end_date, description, team_id) VALUES(?, ?, ?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, title, place, startDate, endDate, description, team_id) >= 1;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Journey> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS WHERE team_id = ?";
            return jdbcTemplate.query(QUERY, new JourneyRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Journey getById(int journeyId) {
        try {
            String QUERY = "SELECT * FROM JOURNEYS WHERE journey_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new JourneyRowMapper(), journeyId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean update(int journeyId,
                          String title,
                          String place,
                          Date startDate,
                          Date endDate,
                          String description) {
        try {
            String QUERY = "UPDATE JOURNEYS SET title = ?, place = ?, start_date = ?, end_date = ?, description = ? WHERE journey_id = ?";
            return jdbcTemplate.update(QUERY, title, place, startDate, endDate, description, journeyId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int journeyId) {
        try {
            String QUERY = "DELETE FROM JOURNEYS WHERE journey_id = ?";
            return jdbcTemplate.update(QUERY, journeyId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
