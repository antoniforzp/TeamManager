package com.app.server.database.rolesService;

import com.app.server.database.rolesService.mappers.RoleRowMapper;
import com.app.server.database.rolesService.mappers.RoleScoutRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.Role;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class RolesDbService implements RolesService {

    private final JdbcTemplate jdbcTemplate;

    public RolesDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Boolean add(String name) {
        try {
            String QUERY = "INSERT INTO ROLES(name) VALUES(?)";
            return jdbcTemplate.update(QUERY, name) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Role> getAll() {
        try {
            String QUERY = "SELECT * FROM ROLES ORDER BY role_id DESC";
            return jdbcTemplate.query(QUERY, new RoleRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Role> getAllInTeam(int teamId) {
        try {
            String QUERY = "SELECT SR.role_id as role_id, R.name as name, SR.scout_id as scout_id\n" +
                    "FROM SCOUTS_ROLES SR\n" +
                    "         JOIN ROLES R on R.role_id = SR.role_id\n" +
                    "         JOIN SCOUTS S on SR.scout_id = S.scout_id\n" +
                    "WHERE S.team_id = ?\n" +
                    "ORDER BY SR.role_id DESC";
            return jdbcTemplate.query(QUERY, new RoleScoutRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<Role> getAllByScoutId(int scoutId) {
        try {
            String QUERY = "SELECT SR.role_id as role_id, R.name as name, SR.scout_id as scout_id\n" +
                    "FROM SCOUTS_ROLES SR\n" +
                    "         JOIN ROLES R on R.role_id = SR.role_id\n" +
                    "WHERE SR.scout_id = ?\n" +
                    "ORDER BY SR.role_id DESC";
            return jdbcTemplate.query(QUERY, new RoleScoutRowMapper(), scoutId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Role getById(int roleId) {
        try {
            String QUERY = "SELECT * FROM ROLES WHERE role_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new RoleScoutRowMapper(), roleId);

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int roleId) {
        try {
            String QUERY = "DELETE FROM ROLES WHERE role_id = ?";
            return jdbcTemplate.update(QUERY, roleId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
