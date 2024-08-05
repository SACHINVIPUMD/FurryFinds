package com.example.furryfinds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class FurryfindsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FurryfindsApplication.class, args);
	}

}
