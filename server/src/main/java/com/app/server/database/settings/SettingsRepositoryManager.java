package com.app.server.database.settings;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.Language;
import com.app.server.model.Settings;
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
                    "       L.language_id as lang_language_id, name as lang_name, abbreviation as lang_abbreviation\n" +
                    "FROM SETTINGS S\n" +
                    "JOIN LANGUAGES L on S.language_id = L.language_id " +
                    "WHERE user_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new SettingsRowMapper(), userId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean setSettings(int userId, int languageId) {
        try {
            String QUERY = "UPDATE SETTINGS SET language_id = ? WHERE user_id = ?";
            return jdbcTemplate.update(QUERY, languageId, userId) >= 1;

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
}
