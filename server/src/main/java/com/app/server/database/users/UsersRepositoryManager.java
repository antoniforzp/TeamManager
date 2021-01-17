package com.app.server.database.users;

import com.app.server.core.AppCore;
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
    public int count() {
        String QUERY = "SELECT COUNT(user_id) FROM USERS";
        Integer integer = jdbcTemplate.queryForObject(QUERY, Integer.class);
        if (integer == null) return 0;
        return integer;
    }

    @Override
    public boolean checkCredentials(String email, String password) {
        String QUERY = "SELECT * FROM USERS WHERE email=? AND password=?";
        User user;
        try {
            user = jdbcTemplate.queryForObject(QUERY, new UserRowMapper(), email, password);
        } catch (DataAccessException e) {
            return false;
        }
        return user != null;
    }

    @Override
    public boolean checkIfExists(String email) {
        String QUERY = "SELECT * FROM USERS WHERE email=?";
        User user;
        try {
            user = jdbcTemplate.queryForObject(QUERY, new UserRowMapper(), email);
        } catch (DataAccessException e) {
            return false;
        }
        return user != null;
    }

    @Override
    public boolean add(int userId, String name, String surname, String password, String email) {
        String QUERY = "INSERT INTO USERS(user_id, name, surname, password, email) VALUES(?,?,?,?,?)";
        try {
            return jdbcTemplate.update(QUERY, userId, name, surname, password, email) >= 1;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean add(String name, String surname, String password, String email) {
        String QUERY = "INSERT INTO USERS(name, surname, password, email) VALUES(?,?,?,?)";
        try {
            return jdbcTemplate.update(QUERY, name, surname, password, email) >= 1;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<User> getAll() {
        String QUERY = "SELECT * FROM USERS";
        return jdbcTemplate.query(QUERY, new UserRowMapper());
    }

    @Override
    public User getById(int userId) {
        String QUERY = "SELECT * FROM USERS WHERE user_id=?";
        User user = null;
        try {
            user = jdbcTemplate.queryForObject(QUERY, new UserRowMapper(), userId);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public User getByCredentials(String email, String password) {
        String QUERY = "SELECT * FROM USERS WHERE email=? AND password=?";
        User user;
        try {
            user = jdbcTemplate.queryForObject(QUERY, new UserRowMapper(), email, password);
        } catch (DataAccessException e) {
            return null;
        }
        return user;
    }

    @Override
    public boolean update(int userId, String name, String surname, String password) {
        String QUERY = "UPDATE USERS SET name=?, surname=?, password=? WHERE user_id=?";
        try {
            return jdbcTemplate.update(QUERY, name, surname, password, userId) >= 1;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deleteById(int userId) {
        String QUERY = "DELETE FROM USERS WHERE user_id=?";
        return jdbcTemplate.update(QUERY, userId) >= 1;
    }

    @Override
    public boolean deleteByEmail(String mail) {
        String QUERY = "DELETE FROM USERS WHERE email=?";
        return jdbcTemplate.update(QUERY, mail) >= 1;
    }
}
