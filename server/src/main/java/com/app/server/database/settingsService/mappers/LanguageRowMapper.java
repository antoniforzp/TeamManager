package com.app.server.database.settingsService.mappers;

import com.app.server.model.Language;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LanguageRowMapper implements RowMapper<Language> {
    @Override
    public Language mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Language(resultSet.getString("language_id"),
                resultSet.getString("name"));
    }
}
