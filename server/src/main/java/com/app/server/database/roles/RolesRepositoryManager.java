package com.app.server.database.roles;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Role;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class RolesRepositoryManager implements RolesRepository {

    private final JdbcTemplate jdbcTemplate;

    public RolesRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(String name) {
        try {
            String QUERY = "INSERT INTO ROLES(name) VALUES(?)";
            return jdbcTemplate.update(QUERY, name) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Role> getAll() {
        try {
            String QUERY = "SELECT * FROM ROLES";
            return jdbcTemplate.query(QUERY, new RoleRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Role> getAllInTeam(int teamId) {
        try {
            String QUERY = "SELECT SR.role_id as role_id, R.name as name, SR.scout_id as scout_id FROM SCOUTS_ROLES SR JOIN ROLES R on R.role_id = SR.role_id JOIN SCOUTS S on SR.scout_id = S.scout_id WHERE S.team_id = ?";
            return jdbcTemplate.query(QUERY, new RoleScoutRowMapper(), teamId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Role> getAllByScoutId(int scoutId) {
        try {
            String QUERY = "SELECT SR.role_id as role_id, R.name as name, SR.scout_id as scout_id FROM SCOUTS_ROLES SR JOIN ROLES R on R.role_id = SR.role_id WHERE SR.scout_id = ?";
            return jdbcTemplate.query(QUERY, new RoleScoutRowMapper(), scoutId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public Role getById(int roleId) {
        try {
            String QUERY = "SELECT * FROM ROLES WHERE role_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new RoleScoutRowMapper(), roleId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int roleId) {
        try {
            String QUERY = "DELETE FROM ROLES WHERE role_id = ?";
            return jdbcTemplate.update(QUERY, roleId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
