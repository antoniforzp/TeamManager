package com.app.server.database.scoutsService;

import com.app.server.database.scoutsService.mappers.ScoutRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.Scout;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
class ScoutsDbService implements ScoutsService {

    private final JdbcTemplate jdbcTemplate;

    public ScoutsDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Integer add(String name,
                       String surname,
                       String pesel,
                       Date birthDate,
                       String address,
                       String postalCode,
                       String city,
                       String phone,
                       int patrolId,
                       int rankId,
                       int instructorRankId,
                       int teamId) {
        try {
            GeneratedKeyHolder holder = new GeneratedKeyHolder();
            String QUERY = "INSERT INTO SCOUTS(name, surname, pesel, birth_date, address, postal_code, city, phone, patrol_id, rank_id,\n" +
                    "                   instructor_rank_id, team_id)\n" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            jdbcTemplate.update(con -> {
                PreparedStatement statement = con.prepareStatement(QUERY, Statement.RETURN_GENERATED_KEYS);
                statement.setString(1, name);
                statement.setString(2, surname);
                statement.setString(3, pesel);
                statement.setDate(4, birthDate != null ? new java.sql.Date(birthDate.getTime()) : null);
                statement.setString(5, address);
                statement.setString(6, postalCode);
                statement.setString(7, city);
                statement.setString(8, phone);

                statement.setInt(9, patrolId);
                statement.setInt(10, rankId);
                statement.setInt(11, instructorRankId);
                statement.setInt(12, teamId);
                return statement;
            }, holder);

            Number key = holder.getKey();
            return key != null ? key.intValue() : null;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean addRole(int scoutId, int roleId) {
        try {
            String QUERY = "INSERT INTO SCOUTS_ROLES(scout_id, role_id) VALUES(?, ?)";
            return jdbcTemplate.update(QUERY, scoutId, roleId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Scout> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT S.scout_id,\n" +
                    "       S.name,\n" +
                    "       S.surname,\n" +
                    "       S.pesel,\n" +
                    "       S.birth_date,\n" +
                    "       S.address,\n" +
                    "       S.postal_code,\n" +
                    "       S.city,\n" +
                    "       S.phone,\n" +
                    "       P.patrol_id,\n" +
                    "       P.name,\n" +
                    "       R.rank_id,\n" +
                    "       R.name,\n" +
                    "       R.abbreviation,\n" +
                    "       R.min_age,\n" +
                    "       R.max_age,\n" +
                    "       IR.rank_id,\n" +
                    "       IR.name,\n" +
                    "       IR.abbreviation\n" +
                    "FROM SCOUTS S\n" +
                    "         LEFT JOIN PATROLS P on S.patrol_id = P.patrol_id\n" +
                    "         LEFT JOIN RANKS R on S.rank_id = R.rank_id\n" +
                    "         LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.team_id = ?\n" +
                    "ORDER BY P.patrol_id DESC, R.rank_id DESC, IR.rank_id DESC\n";
            return jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Scout> getAllByTeamIdPatrolId(int teamId, int patrolId) {
        try {
            String QUERY = "SELECT S.scout_id,\n" +
                    "       S.name,\n" +
                    "       S.surname,\n" +
                    "       S.pesel,\n" +
                    "       S.birth_date,\n" +
                    "       S.address,\n" +
                    "       S.postal_code,\n" +
                    "       S.city,\n" +
                    "       S.phone,\n" +
                    "       P.patrol_id,\n" +
                    "       P.name,\n" +
                    "       R.rank_id,\n" +
                    "       R.name,\n" +
                    "       R.abbreviation,\n" +
                    "       R.min_age,\n" +
                    "       R.max_age,\n" +
                    "       IR.rank_id,\n" +
                    "       IR.name,\n" +
                    "       IR.abbreviation\n" +
                    "FROM SCOUTS S\n" +
                    "         LEFT JOIN PATROLS P on S.patrol_id = P.patrol_id\n" +
                    "         LEFT JOIN RANKS R on S.rank_id = R.rank_id\n" +
                    "         LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.team_id = ?\n" +
                    "  AND S.patrol_id = ?";
            return jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId, patrolId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Scout getById(int scoutId) {
        try {
            String QUERY = "SELECT S.scout_id,\n" +
                    "       S.name,\n" +
                    "       S.surname,\n" +
                    "       S.pesel,\n" +
                    "       S.birth_date,\n" +
                    "       S.address,\n" +
                    "       S.postal_code,\n" +
                    "       S.city,\n" +
                    "       S.phone,\n" +
                    "       P.patrol_id,\n" +
                    "       P.name,\n" +
                    "       R.rank_id,\n" +
                    "       R.name,\n" +
                    "       R.abbreviation,\n" +
                    "       R.min_age,\n" +
                    "       R.max_age,\n" +
                    "       IR.rank_id,\n" +
                    "       IR.name,\n" +
                    "       IR.abbreviation\n" +
                    "FROM SCOUTS S\n" +
                    "         LEFT JOIN PATROLS P on S.patrol_id = P.patrol_id\n" +
                    "         LEFT JOIN RANKS R on S.rank_id = R.rank_id\n" +
                    "         LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.scout_id = ?\n" +
                    "ORDER BY P.patrol_id DESC, R.rank_id DESC, IR.rank_id DESC";
            return jdbcTemplate.queryForObject(QUERY, new ScoutRowMapper(), scoutId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean update(int scoutId,
                          String name,
                          String surname,
                          String pesel,
                          Date birthDate,
                          String address,
                          String postalCode,
                          String city,
                          String phone,
                          int patrolId,
                          int rankId,
                          int instructorRankId) {
        try {
            String QUERY = "UPDATE SCOUTS\n" +
                    "SET name               = ?,\n" +
                    "    surname            = ?,\n" +
                    "    pesel              = ?,\n" +
                    "    birth_date         = ?,\n" +
                    "    address            = ?,\n" +
                    "    postal_code        = ?,\n" +
                    "    city               = ?,\n" +
                    "    phone              = ?,\n" +
                    "    patrol_id          = ?,\n" +
                    "    rank_id            = ?,\n" +
                    "    instructor_rank_id = ?\n" +
                    "WHERE scout_id = ?";
            return jdbcTemplate.update(QUERY, name, surname, pesel, birthDate, address, postalCode, city, phone, patrolId, rankId, instructorRankId, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int scoutId) {
        try {
            String QUERY = "DELETE FROM SCOUTS WHERE scout_id = ?";
            return jdbcTemplate.update(QUERY, scoutId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteRole(int scoutId, int roleId) {
        try {
            String QUERY = "DELETE FROM SCOUTS_ROLES WHERE scout_id = ? AND role_id = ?";
            return jdbcTemplate.update(QUERY, scoutId, roleId) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
