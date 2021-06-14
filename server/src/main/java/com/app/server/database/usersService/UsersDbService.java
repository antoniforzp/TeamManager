package com.app.server.database.usersService;

import com.app.server.database.usersService.mappers.UserRowMapper;
import com.app.server.exceptions.DatabaseException;
import com.app.server.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersDbService implements UsersService {

    private final JdbcTemplate jdbcTemplate;

    public UsersDbService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Boolean checkCredentials(String email, String password) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE email = ? AND password = ?";
            return !jdbcTemplate.query(QUERY, new UserRowMapper(), email, password).isEmpty();

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean checkIfExists(String email) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE email = ?";
            return !jdbcTemplate.query(QUERY, new UserRowMapper(), email).isEmpty();

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean add(int userId,
                       String name,
                       String surname,
                       String password,
                       String email) {
        try {
            String QUERY = "INSERT INTO USERS(user_id, name, surname, password, email) VALUES(?, ?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, userId, name, surname, password, email) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean add(String name,
                       String surname,
                       String password,
                       String email) {
        try {
            String QUERY = "INSERT INTO USERS(name, surname, password, email) VALUES(?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, name, surname, password, email) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public List<User> getAll() {
        try {
            String QUERY = "SELECT * FROM USERS";
            return jdbcTemplate.query(QUERY, new UserRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public User getById(int userId) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE user_id = ?";
            List<User> users = jdbcTemplate.query(QUERY, new UserRowMapper(), userId);
            return !users.isEmpty() ? users.get(0) : null;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public User getByEmail(String email) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE email = ?";
            List<User> users = jdbcTemplate.query(QUERY, new UserRowMapper(), email);
            return !users.isEmpty() ? users.get(0) : null;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean update(int userId,
                          String name,
                          String surname,
                          String password) {
        try {
            String QUERY = "UPDATE USERS SET name = ?, surname = ?, password = ? WHERE user_id = ?";
            return jdbcTemplate.update(QUERY, name, surname, password, userId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteById(int userId) {
        try {
            String QUERY = "DELETE FROM USERS WHERE user_id = ?";
            return jdbcTemplate.update(QUERY, userId) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }

    @Override
    public Boolean deleteByEmail(String mail) {
        try {
            String QUERY = "DELETE FROM USERS WHERE email = ?";
            return jdbcTemplate.update(QUERY, mail) >= 1;

        } catch (DataIntegrityViolationException ex) {
            return true;
        } catch (DataAccessException ex) {
            throw new DatabaseException(ex);
        }
    }
}
