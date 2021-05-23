package com.app.server.database.settingsService.mappers;

import com.app.server.model.Theme;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ThemeRowMapper implements RowMapper<Theme> {
    @Override
    public Theme mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Theme(resultSet.getInt("theme_id"),
                resultSet.getString("name"),
                resultSet.getString("abbreviation"));
    }
}
