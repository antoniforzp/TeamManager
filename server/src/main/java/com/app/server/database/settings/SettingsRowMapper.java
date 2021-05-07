package com.app.server.database.settings;

import com.app.server.model.Language;
import com.app.server.model.Settings;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SettingsRowMapper implements RowMapper<Settings> {
    @Override
    public Settings mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Settings(resultSet.getInt("user_id"),

                // Language
                new Language(
                        resultSet.getInt("lang_language_id"),
                        resultSet.getString("lang_name"),
                        resultSet.getString("lang_abbreviation")
                ));
    }
}
