package com.app.server.database.roles;

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
        String QUERY = "INSERT INTO ROLES(name) VALUES(?)";
        return jdbcTemplate.update(QUERY, name) >= 1;
    }

    @Override
    public List<Role> getAll() {
        String QUERY = "SELECT * FROM ROLES";
        return jdbcTemplate.query(QUERY, new RoleRowMapper());
    }

    @Override
    public List<Role> getAllByScoutId(int scoutId) {
        String QUERY = "SELECT SR.role_id as role_id, R.name as name FROM SCOUTS_ROLES SR JOIN ROLES R on R.role_id = SR.role_id WHERE SR.scout_id=?";
        return jdbcTemplate.query(QUERY, new RoleRowMapper(), scoutId);
    }

    @Override
    public Role getById(int roleId) {
        String QUERY = "SELECT * FROM ROLES WHERE role_id=?";
        Role role;
        try {
            role = jdbcTemplate.queryForObject(QUERY, new RoleRowMapper(), roleId);
        } catch (DataAccessException e) {
            return null;
        }
        return role;
    }

    @Override
    public boolean deleteById(int roleId) {
        String QUERY = "DELETE FROM ROLES WHERE role_id=?";
        return jdbcTemplate.update(QUERY, roleId) >= 1;
    }
}
