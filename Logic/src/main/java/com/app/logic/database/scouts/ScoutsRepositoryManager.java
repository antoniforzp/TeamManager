package com.app.logic.database.scouts;

import com.app.logic.model.Scout;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class ScoutsRepositoryManager implements ScoutsRepository {

    private final JdbcTemplate jdbcTemplate;

    public ScoutsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countByTeamId(int teamId) {
        String QUERY = "SELECT COUNT(scout_id) FROM SCOUTS WHERE team_id=?";
        Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class, teamId);
        if (integer == null) return 0;
        return integer;
    }

    @Override
    public boolean add(String name, String surname, String pesel, Date birthDate, String address, String postalCode, String city, String phone, int teamId, int troopId, int rankId, int instructorRankId) {
        String QUERY = "INSERT INTO SCOUTS(name, surname, pesel, birth_date, address, postal_code, city, phone, team_id, troop_id, rank_id, instructor_rank_id) " +
                "VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            return jdbcTemplate.update(QUERY, name, surname, pesel, birthDate, address, postalCode, city, phone, teamId, troopId, rankId, instructorRankId) >= 1;
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Scout> getAllByTeamId(int teamId) {
        String QUERY = "SELECT S.scout_id,\n" +
                "       S.name,\n" +
                "       S.surname,\n" +
                "       S.pesel,\n" +
                "       S.birth_date,\n" +
                "       S.address,\n" +
                "       S.postal_code,\n" +
                "       S.city,\n" +
                "       S.phone,\n" +
                "\n" +
                "       T.troop_id,\n" +
                "       T.name,\n" +
                "\n" +
                "       R.rank_id,\n" +
                "       R.name,\n" +
                "       R.abbreviation,\n" +
                "       R.min_age,\n" +
                "       R.max_age,\n" +
                "\n" +
                "       IR.rank_id,\n" +
                "       IR.name,\n" +
                "       IR.abbreviation\n" +
                "\n" +
                "FROM SCOUTS S\n" +
                "         LEFT JOIN TROOPS T on S.troop_id = T.troop_id\n" +
                "         LEFT JOIN RANKS R on S.rank_id = R.rank_id\n" +
                "         LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                "\n" +
                "WHERE S.team_id=?;";

        return jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId);
    }

    @Override
    public List<Scout> getAllByTeamIdTroopId(int teamId, int troopId) {
        String QUERY = "SELECT S.scout_id,\n" +
                "       S.name,\n" +
                "       S.surname,\n" +
                "       S.pesel,\n" +
                "       S.birth_date,\n" +
                "       S.address,\n" +
                "       S.postal_code,\n" +
                "       S.city,\n" +
                "       S.phone,\n" +
                "\n" +
                "       T.troop_id,\n" +
                "       T.name,\n" +
                "\n" +
                "       R.rank_id,\n" +
                "       R.name,\n" +
                "       R.abbreviation,\n" +
                "       R.min_age,\n" +
                "       R.max_age,\n" +
                "\n" +
                "       IR.rank_id,\n" +
                "       IR.name,\n" +
                "       IR.abbreviation\n" +
                "\n" +
                "FROM SCOUTS S\n" +
                "         LEFT JOIN TROOPS T on S.troop_id = T.troop_id\n" +
                "         LEFT JOIN RANKS R on S.rank_id = R.rank_id\n" +
                "         LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                "\n" +
                "WHERE S.team_id = ? AND S.troop_id=?;";

        return jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId, troopId);
    }

    @Override
    public Scout getById(int scoutId) {
        String QUERY = "SELECT S.scout_id,\n" +
                "       S.name,\n" +
                "       S.surname,\n" +
                "       S.pesel,\n" +
                "       S.birth_date,\n" +
                "       S.address,\n" +
                "       S.postal_code,\n" +
                "       S.city,\n" +
                "       S.phone,\n" +
                "\n" +
                "       T.troop_id,\n" +
                "       T.name,\n" +
                "\n" +
                "       R.rank_id,\n" +
                "       R.name,\n" +
                "       R.abbreviation,\n" +
                "       R.min_age,\n" +
                "       R.max_age,\n" +
                "\n" +
                "       IR.rank_id,\n" +
                "       IR.name,\n" +
                "       IR.abbreviation\n" +
                "\n" +
                "FROM SCOUTS S\n" +
                "         LEFT JOIN TROOPS T on S.troop_id = T.troop_id\n" +
                "         LEFT JOIN RANKS R on S.rank_id = R.rank_id\n" +
                "         LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                "\n" +
                "WHERE S.scout_id=?;";
        Scout scout;
        try {
            scout = jdbcTemplate.queryForObject(QUERY, new ScoutRowMapper(), scoutId);
        } catch (DataAccessException e) {
            return null;
        }
        return scout;
    }

    @Override
    public boolean update(int scoutId, String name, String surname, String pesel, Date birthDate, String address, String postalCode, String city, String phone, int troopId, int rankId, int instructorRankId) {
        String QUERY = "UPDATE SCOUTS SET name=?, surname=?, pesel=?, birth_date=?, address=?, postal_code=?, city=?, phone=?, troop_id=?, rank_id=?, instructor_rank_id=? WHERE scout_id=?";
        try {
            return jdbcTemplate.update(QUERY, name, surname, pesel, birthDate, address, postalCode, city, phone, troopId, rankId, instructorRankId, scoutId) >= 1;
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean addRole(int scoutId, int roleId) {
        String QUERY = "INSERT INTO SCOUTS_ROLES(scout_id, role_id) VALUES(?,?)";
        try {
            return jdbcTemplate.update(QUERY, scoutId, roleId) >= 1;
        } catch (DuplicateKeyException e) {
            return false;
        }
    }

    @Override
    public boolean deleteRole(int scoutId, int roleId) {
        String QUERY = "DELETE FROM SCOUTS_ROLES WHERE scout_id=? AND role_id=?";
        return jdbcTemplate.update(QUERY, scoutId, roleId) >= 1;
    }

    @Override
    public boolean deleteAllRoles(int scoutId) {
        String QUERY = "DELETE FROM SCOUTS_ROLES WHERE scout_id=?";
        return jdbcTemplate.update(QUERY, scoutId) >= 1;
    }
}
