package com.app.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.SpringVersion;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);

        System.out.println("Spring version");
        System.out.println(SpringVersion.getVersion());
    }
}
