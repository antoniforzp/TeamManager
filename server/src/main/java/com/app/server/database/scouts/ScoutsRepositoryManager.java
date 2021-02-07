package com.app.server.database.scouts;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Scout;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
class ScoutsRepositoryManager implements ScoutsRepository {

    private final JdbcTemplate jdbcTemplate;

    public ScoutsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String name, String surname, String pesel, Date birthDate, String address, String postalCode, String city, String phone, int troopId, int rankId, int instructorRankId, int teamId) {
        try {
            String QUERY = "INSERT INTO SCOUTS(name, surname, pesel, birth_date, address, postal_code, city, phone, troop_id, rank_id, instructor_rank_id, team_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, name, surname, pesel, birthDate, address, postalCode, city, phone, troopId, rankId, instructorRankId, teamId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Scout> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT S.scout_id, S.name, S.surname, S.pesel, S.birth_date, S.address, S.postal_code, S.city, S.phone, T.troop_id, T.name, R.rank_id, R.name, R.abbreviation, R.min_age, R.max_age, IR.rank_id, IR.name, IR.abbreviation\n" +
                    "FROM SCOUTS S LEFT JOIN TROOPS T on S.troop_id = T.troop_id LEFT JOIN RANKS R on S.rank_id = R.rank_id LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.team_id = ?";
            return jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Scout> getAllByTeamIdTroopId(int teamId, int troopId) {
        try {
            String QUERY = "SELECT S.scout_id, S.name, S.surname, S.pesel, S.birth_date, S.address, S.postal_code, S.city, S.phone, T.troop_id, T.name, R.rank_id, R.name, R.abbreviation, R.min_age, R.max_age, IR.rank_id, IR.name, IR.abbreviation\n" +
                    "FROM SCOUTS S LEFT JOIN TROOPS T on S.troop_id = T.troop_id LEFT JOIN RANKS R on S.rank_id = R.rank_id LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.team_id = ? AND S.troop_id = ?";
            return jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId, troopId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Scout getById(int scoutId) {
        try {
            String QUERY = "SELECT S.scout_id, S.name, S.surname, S.pesel, S.birth_date, S.address, S.postal_code, S.city, S.phone, T.troop_id, T.name, R.rank_id, R.name, R.abbreviation, R.min_age, R.max_age, IR.rank_id, IR.name, IR.abbreviation\n" +
                    "FROM SCOUTS S LEFT JOIN TROOPS T on S.troop_id = T.troop_id LEFT JOIN RANKS R on S.rank_id = R.rank_id LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.scout_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new ScoutRowMapper(), scoutId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean update(int scoutId, String name, String surname, String pesel, Date birthDate, String address, String postalCode, String city, String phone, int troopId, int rankId, int instructorRankId) {
        try {
            String QUERY = "UPDATE SCOUTS SET name = ?, surname = ?, pesel = ?, birth_date = ?, address = ?, postal_code = ?, city = ?, phone = ?, troop_id = ?, rank_id = ?, instructor_rank_id = ? WHERE scout_id = ?";
            return jdbcTemplate.update(QUERY, name, surname, pesel, birthDate, address, postalCode, city, phone, troopId, rankId, instructorRankId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean addRole(int scoutId, int roleId) {
        try {
            String QUERY = "INSERT INTO SCOUTS_ROLES(scout_id, role_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, scoutId, roleId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int scoutId) {
        try {
            String QUERY = "DELETE FROM SCOUTS WHERE scout_id = ?";
            return jdbcTemplate.update(QUERY, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteRole(int scoutId, int roleId) {
        try {
            String QUERY = "DELETE FROM SCOUTS_ROLES WHERE scout_id = ? AND role_id = ?";
            return jdbcTemplate.update(QUERY, scoutId, roleId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteAllRoles(int scoutId) {
        try {
            String QUERY = "DELETE FROM SCOUTS_ROLES WHERE scout_id = ?";
            return jdbcTemplate.update(QUERY, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
