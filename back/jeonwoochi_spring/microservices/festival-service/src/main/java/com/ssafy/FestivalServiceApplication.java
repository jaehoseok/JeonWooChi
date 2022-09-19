package com.ssafy;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDiscoveryClient
public class FestivalServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(FestivalServiceApplication.class, args);
    }
}
