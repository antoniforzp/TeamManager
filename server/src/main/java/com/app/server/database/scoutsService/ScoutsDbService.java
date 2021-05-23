package com.app.server.database.scoutsService;

import com.app.server.database.scoutsService.mappers.ScoutRowMapper;
import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Scout;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
class ScoutsDbService implements ScoutsService {

    private final JdbcTemplate jdbcTemplate;

    public ScoutsDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Async
    @Override
    public CompletableFuture<Boolean> add(String name,
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
            String QUERY = "INSERT INTO SCOUTS(name, surname, pesel, birth_date, address, postal_code, city, phone, patrol_id, rank_id, instructor_rank_id, team_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, surname, pesel, birthDate, address, postalCode, city, phone, patrolId, rankId, instructorRankId, teamId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<Scout>> getAllByTeamId(int teamId) {
        try {
            String QUERY = "SELECT S.scout_id, S.name, S.surname, S.pesel, S.birth_date, S.address, S.postal_code, S.city, S.phone, T.patrol_id, T.name, R.rank_id, R.name, R.abbreviation, R.min_age, R.max_age, IR.rank_id, IR.name, IR.abbreviation\n" +
                    "FROM SCOUTS S LEFT JOIN TROOPS T on S.patrol_id = T.patrol_id LEFT JOIN RANKS R on S.rank_id = R.rank_id LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.team_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<List<Scout>> getAllByTeamIdTroopId(int teamId, int troopId) {
        try {
            String QUERY = "SELECT S.scout_id, S.name, S.surname, S.pesel, S.birth_date, S.address, S.postal_code, S.city, S.phone, T.patrol_id, T.name, R.rank_id, R.name, R.abbreviation, R.min_age, R.max_age, IR.rank_id, IR.name, IR.abbreviation\n" +
                    "FROM SCOUTS S LEFT JOIN TROOPS T on S.patrol_id = T.patrol_id LEFT JOIN RANKS R on S.rank_id = R.rank_id LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.team_id = ? AND S.patrol_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new ScoutRowMapper(), teamId, troopId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Scout> getById(int scoutId) {
        try {
            String QUERY = "SELECT S.scout_id, S.name, S.surname, S.pesel, S.birth_date, S.address, S.postal_code, S.city, S.phone, T.patrol_id, T.name, R.rank_id, R.name, R.abbreviation, R.min_age, R.max_age, IR.rank_id, IR.name, IR.abbreviation\n" +
                    "FROM SCOUTS S LEFT JOIN TROOPS T on S.patrol_id = T.patrol_id LEFT JOIN RANKS R on S.rank_id = R.rank_id LEFT JOIN INSTRUCTOR_RANKS IR on IR.rank_id = S.instructor_rank_id\n" +
                    "WHERE S.scout_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.queryForObject(QUERY, new ScoutRowMapper(), scoutId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> update(int scoutId,
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
            String QUERY = "UPDATE SCOUTS SET name = ?, surname = ?, pesel = ?, birth_date = ?, address = ?, postal_code = ?, city = ?, phone = ?, patrol_id = ?, rank_id = ?, instructor_rank_id = ? WHERE scout_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name, surname, pesel, birthDate, address, postalCode, city, phone, patrolId, rankId, instructorRankId, scoutId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> addRole(int scoutId, int roleId) {
        try {
            String QUERY = "INSERT INTO SCOUTS_ROLES(scout_id, role_id) VALUES(?, ?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, scoutId, roleId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> deleteById(int scoutId) {
        try {
            String QUERY = "DELETE FROM SCOUTS WHERE scout_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, scoutId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Async
    @Override
    public CompletableFuture<Boolean> deleteRole(int scoutId, int roleId) {
        try {
            String QUERY = "DELETE FROM SCOUTS_ROLES WHERE scout_id = ? AND role_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, scoutId, roleId) >= 1);

        } catch (DataIntegrityViolationException ex) {
            return CompletableFuture.completedFuture(true);
        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
