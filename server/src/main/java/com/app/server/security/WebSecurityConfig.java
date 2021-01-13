package com.app.server.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Order(101)
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();
    }
}

//SECURITY
//@Bean
//public PasswordEncoder passwordEncoder() {
//    return NoOpPasswordEncoder.getInstance();
//}
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetailsManager manager = new InMemoryUserDetailsManager();
//        UserDetails user = User.withUsername("bill@mail.com")
//                .password("12345")
//                .authorities("ADMIN")
//                .build();
//
//        manager.createUser(user);
//        return manager;
//    }
//
//    @Override
//    @Bean
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        .cors()
//                .configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
//                .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS).permitAll();
//    }