package com.confisafe;

import com.confisafe.model.Usuario;
import com.confisafe.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ConfisafeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfisafeApplication.class, args);
    }

    @Bean
    CommandLineRunner seedUsers(UsuarioRepository repo) {
        return args -> {
            try {
                if (!repo.existsByEmail("admin@confisafe.com")) {
                    repo.save(new Usuario("admin@confisafe.com", "admin123"));
                }
                if (!repo.existsByEmail("teste@confisafe.com")) {
                    repo.save(new Usuario("teste@confisafe.com", "123456"));
                }
                System.out.println("Seed concluída.");
            } catch (Exception e) {
                System.err.println("Seed falhou: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            }
        };
    }
}
