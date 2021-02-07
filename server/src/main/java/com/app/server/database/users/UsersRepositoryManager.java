package com.app.server.database.users;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
class UsersRepositoryManager implements UsersRepository {

    private final JdbcTemplate jdbcTemplate;

    public UsersRepositoryManager(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean checkCredentials(String email, String password) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE email = ? AND password = ?";
            return jdbcTemplate.queryForObject(QUERY, new UserRowMapper(), email, password) != null;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean checkIfExists(String email) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE email = ?";
            return !jdbcTemplate.query(QUERY, new UserRowMapper(), email).isEmpty();

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean add(int userId, String name, String surname, String password, String email) {
        try {
            String QUERY = "INSERT INTO USERS(user_id, name, surname, password, email) VALUES(?, ?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, userId, name, surname, password, email) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean add(String name, String surname, String password, String email) {
        try {
            String QUERY = "INSERT INTO USERS(name, surname, password, email) VALUES(?, ?, ?, ?)";
            return jdbcTemplate.update(QUERY, name, surname, password, email) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public List<User> getAll() {
        try {
            String QUERY = "SELECT * FROM USERS";
            return jdbcTemplate.query(QUERY, new UserRowMapper());

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public User getById(int userId) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE user_id = ?";
            return jdbcTemplate.queryForObject(QUERY, new UserRowMapper(), userId);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public User getByCredentials(String email, String password) {
        try {
            String QUERY = "SELECT * FROM USERS WHERE email = ? AND password = ?";
            return jdbcTemplate.queryForObject(QUERY, new UserRowMapper(), email, password);

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean update(int userId, String name, String surname, String password) {
        try {
            String QUERY = "UPDATE USERS SET name = ?, surname = ?, password = ? WHERE user_id = ?";
            return jdbcTemplate.update(QUERY, name, surname, password, userId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteById(int userId) {
        try {
            String QUERY = "DELETE FROM USERS WHERE user_id = ?";
            return jdbcTemplate.update(QUERY, userId) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }

    @Override
    public boolean deleteByEmail(String mail) {
        try {
            String QUERY = "DELETE FROM USERS WHERE email = ?";
            return jdbcTemplate.update(QUERY, mail) >= 1;

        } catch (DataAccessException ex) {
            throw new DatabaseErrorException(ex);
        }
    }
}
