package com.olimpiadas2025.turismo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TurismoApplication {
	public static void main(String[] args) {
		SpringApplication.run(TurismoApplication.class, args);
	}
	@Bean
	CommandLineRunner run() {
		return args -> System.out.println("✅ La app levantó correctamente");
	}

}

