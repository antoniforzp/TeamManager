package com.app.server.database.rolesService.mappers;

import com.app.server.model.Role;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoleRowMapper implements RowMapper<Role> {
    @Override
    public Role mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Role(resultSet.getInt("role_id"),
                resultSet.getString("name"),
                null);
    }
}
