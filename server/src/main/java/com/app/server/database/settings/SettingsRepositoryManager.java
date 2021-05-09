package com.app.server.database.settings;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Language;
import com.app.server.model.Settings;
import com.app.server.model.Theme;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SettingsRepositoryManager implements SettingsRepository {

    private final JdbcTemplate jdbcTemplate;

    public SettingsRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Settings getSettings(int userId) {
        try {
            String QUERY = "SELECT user_id,\n" +
                    "       L.language_id  as lang_language_id,\n" +
                    "       L.name         as lang_name,\n" +
                    "       L.abbreviation as lang_abbreviation,\n" +
                    "       T.theme_id     as theme_theme_id,\n" +
                    "       T.name         as theme_name,\n" +
                    "       T.abbreviation as theme_abbreviation\n" +
                    "FROM SETTINGS S\n" +
                    "         " +
                    "JOIN LANGUAGES L on S.language_id = L.language_id\n" +
                    "         " +
                    "JOIN THEMES T on S.theme_id = T.theme_id\n" +
                    "WHERE user_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new SettingsRowMapper(), userId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean setSettings(int userId, int languageId, int themeId) {
        try {
            String QUERY = "UPDATE SETTINGS SET language_id = ?, theme_id = ? WHERE user_id = ?";
            return jdbcTemplate.update(QUERY, languageId, themeId, userId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Language> getLanguages() {
        try {
            String QUERY = "SELECT * FROM LANGUAGES";
            return jdbcTemplate.query(QUERY, new LanguageRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<Theme> getThemes() {
        try {
            String QUERY = "SELECT * FROM THEMES";
            return jdbcTemplate.query(QUERY, new ThemeRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
