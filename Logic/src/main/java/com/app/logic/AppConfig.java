package com.app.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.Objects;

@Configuration
@ComponentScan(basePackages = {
        "com.app.logic.database.*",
        "com.app.logic.core",
        "com.app.logic.controllers"
})
@PropertySource("classpath:application.properties")
public class AppConfig {

    Environment env;

    @Autowired
    public void setEnv(Environment env) {
        this.env = env;
    }

    @Bean
    public DataSource dataSource() {
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName(Objects.requireNonNull(env.getProperty("datasource.apidb.driver-class-name")));
        dataSourceBuilder.url(env.getProperty("datasource.apidb.jdbc-url"));
        dataSourceBuilder.username(env.getProperty("datasource.apidb.username"));
        dataSourceBuilder.password(env.getProperty("datasource.apidb.password"));
        return dataSourceBuilder.build();
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }
}
