package com.app.server.database.rolesService;

import com.app.server.database.rolesService.mappers.RoleRowMapper;
import com.app.server.database.rolesService.mappers.RoleScoutRowMapper;
import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Role;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
class RolesDbService implements RolesService {

    private final JdbcTemplate jdbcTemplate;

    public RolesDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> add(String name) {
        try {
            String QUERY = "INSERT INTO ROLES(name) VALUES(?)";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, name) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<List<Role>> getAll() {
        try {
            String QUERY = "SELECT * FROM ROLES";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new RoleRowMapper()));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<List<Role>> getAllInTeam(int teamId) {
        try {
            String QUERY = "SELECT SR.role_id as role_id, R.name as name, SR.scout_id as scout_id FROM SCOUTS_ROLES SR JOIN ROLES R on R.role_id = SR.role_id JOIN SCOUTS S on SR.scout_id = S.scout_id WHERE S.team_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new RoleScoutRowMapper(), teamId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<List<Role>> getAllByScoutId(int scoutId) {
        try {
            String QUERY = "SELECT SR.role_id as role_id, R.name as name, SR.scout_id as scout_id FROM SCOUTS_ROLES SR JOIN ROLES R on R.role_id = SR.role_id WHERE SR.scout_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.query(QUERY, new RoleScoutRowMapper(), scoutId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Role> getById(int roleId) {
        try {
            String QUERY = "SELECT * FROM ROLES WHERE role_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.queryForObject(QUERY, new RoleScoutRowMapper(), roleId));

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    @Async("asyncExecutor")
    public CompletableFuture<Boolean> deleteById(int roleId) {
        try {
            String QUERY = "DELETE FROM ROLES WHERE role_id = ?";
            return CompletableFuture.completedFuture(jdbcTemplate.update(QUERY, roleId) >= 1);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
