package com.app.server.database.meetings;

import com.app.server.model.Meeting;
import com.app.server.model.Meeting;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
class MeetingsRepositoryManager implements MeetingsRepository {

    private final JdbcTemplate jdbcTemplate;

    public MeetingsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countByTeamId(int teamId) {
        String QUERY = "SELECT COUNT(meeting_id) FROM MEETINGS WHERE team_id=?";
        Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class, teamId);
        if (integer == null) return 0;
        return integer;
    }

    @Override
    public boolean add(String title, String place, Date date, int members, int team_id) {
        String QUERY = "INSERT INTO MEETINGS(title, place, date, team_id) VALUES(?,?,?,?)";
        return jdbcTemplate.update(QUERY, title, place, date, members, team_id) >= 1;
    }

    @Override
    public List<Meeting> getAllByTeamId(int teamId) {
        String QUERY = "SELECT * FROM MEETINGS WHERE team_id=?";
        return jdbcTemplate.query(QUERY, new MeetingRowMapper(), teamId);
    }

    @Override
    public Meeting getById(int meetingId) {
        String QUERY = "SELECT * FROM MEETINGS WHERE meeting_id=?";
        Meeting meeting;
        try {
            meeting = jdbcTemplate.queryForObject(QUERY, new MeetingRowMapper(), meetingId);
        } catch (DataAccessException e) {
            return null;
        }
        return meeting;
    }

    @Override
    public boolean update(int meetingId, String title, String place, Date date, int participants) {
        String QUERY = "UPDATE MEETINGS SET title=?, place=?, date=? WHERE meeting_id=?";
        return jdbcTemplate.update(QUERY, title, place, date, participants, meetingId) >= 1;
    }

    @Override
    public boolean deleteById(int meetingId) {
        String QUERY = "DELETE FROM MEETINGS WHERE meeting_id=?";
        return jdbcTemplate.update(QUERY, meetingId) >= 1;
    }
}
