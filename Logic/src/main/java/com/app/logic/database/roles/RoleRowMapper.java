package com.app.logic.database.roles;

import com.app.logic.model.Role;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class RoleRowMapper implements RowMapper<Role> {
    @Override
    public Role mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Role(resultSet.getInt("role_id"),
                resultSet.getString("name"));
    }
}
