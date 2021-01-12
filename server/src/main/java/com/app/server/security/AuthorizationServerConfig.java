//package com.app.server.security;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.core.env.Environment;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
//import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
//import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
//import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
//import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
//
////@Configuration
////@EnableAuthorizationServer
////@EnableResourceServer
////@PropertySource("classpath:authentication.properties")
//public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
//
//    private final Environment env;
//    private final AuthenticationManager authenticationManager;
//
//    public AuthorizationServerConfig(Environment env, AuthenticationManager authenticationManager) {
//        this.env = env;
//        this.authenticationManager = authenticationManager;
//    }
//
//    @Override
//    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
//        clients.inMemory()
//                .withClient(env.getProperty("auth.clientId"))
//                .secret(env.getProperty("auth.secret"))
//                .authorizedGrantTypes("password", "refresh_token", "authorization_token")
//                .scopes("write");
//    }
//
//    @Override
//    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
//        endpoints.authenticationManager(authenticationManager);
//    }
//}