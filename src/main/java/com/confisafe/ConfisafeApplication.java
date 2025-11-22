package com.confisafe;

import com.confisafe.model.Usuario;
import com.confisafe.model.StatusTreinamento;
import com.confisafe.model.Treinamento;
import com.confisafe.repository.UsuarioRepository;
import com.confisafe.repository.TreinamentoRepository;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class ConfisafeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfisafeApplication.class, args);
    }

    @Bean
    //@Profile("dev")
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

    @Bean
    //@Profile("dev") // mesmo esquema: só roda com profile "dev"
    CommandLineRunner seedTreinamentos(TreinamentoRepository treRepo) {
        return args -> {
            try {
                // evita duplicar a cada vez que a app sobe
                if (treRepo.count() > 0) {
                    System.out.println("Seed de treinamentos ignorada: já existem registros.");
                    return;
                }

                // 1) João Silva
                Treinamento t1 = new Treinamento();
                t1.setNomeFuncionario("João Silva");
                t1.setCargo("Operador");
                t1.setCurso("NR-33");
                t1.setDataConclusao(LocalDate.of(2024, 1, 10));
                t1.setValidade(LocalDate.of(2025, 1, 10));
                t1.setStatus(StatusTreinamento.VALIDO);
                treRepo.save(t1);

                // 2) Maria Souza
                Treinamento t2 = new Treinamento();
                t2.setNomeFuncionario("Maria Souza");
                t2.setCargo("Técnica");
                t2.setCurso("NR-35");
                t2.setDataConclusao(LocalDate.of(2023, 12, 15));
                t2.setValidade(LocalDate.of(2024, 12, 15));
                t2.setStatus(StatusTreinamento.VENCE_EM_BREVE);
                treRepo.save(t2);

                // 3) Carlos Pereira
                Treinamento t3 = new Treinamento();
                t3.setNomeFuncionario("Carlos Pereira");
                t3.setCargo("Supervisor");
                t3.setCurso("NR-10");
                t3.setDataConclusao(LocalDate.of(2022, 11, 20));
                t3.setValidade(LocalDate.of(2023, 11, 20));
                t3.setStatus(StatusTreinamento.VENCIDO);
                treRepo.save(t3);

                // 4) Ana Ribeiro
                Treinamento t4 = new Treinamento();
                t4.setNomeFuncionario("Ana Ribeiro");
                t4.setCargo("Engenheira");
                t4.setCurso("NR-12");
                t4.setDataConclusao(LocalDate.of(2024, 2, 5));
                t4.setValidade(LocalDate.of(2025, 2, 5));
                t4.setStatus(StatusTreinamento.VALIDO);
                treRepo.save(t4);

                // 5) Pedro Martins
                Treinamento t5 = new Treinamento();
                t5.setNomeFuncionario("Pedro Martins");
                t5.setCargo("Eletricista");
                t5.setCurso("NR-10");
                t5.setDataConclusao(LocalDate.of(2023, 8, 18));
                t5.setValidade(LocalDate.of(2024, 8, 18));
                t5.setStatus(StatusTreinamento.VENCIDO);
                treRepo.save(t5);

                // 6) Juliana Costa
                Treinamento t6 = new Treinamento();
                t6.setNomeFuncionario("Juliana Costa");
                t6.setCargo("Auxiliar");
                t6.setCurso("NR-33");
                t6.setDataConclusao(LocalDate.of(2023, 9, 10));
                t6.setValidade(LocalDate.of(2024, 9, 10));
                t6.setStatus(StatusTreinamento.VENCE_EM_BREVE);
                treRepo.save(t6);

                // 7) Rafael Lima
                Treinamento t7 = new Treinamento();
                t7.setNomeFuncionario("Rafael Lima");
                t7.setCargo("Analista");
                t7.setCurso("NR-35");
                t7.setDataConclusao(LocalDate.of(2024, 3, 12));
                t7.setValidade(LocalDate.of(2025, 3, 12));
                t7.setStatus(StatusTreinamento.VALIDO);
                treRepo.save(t7);

                // 8) Beatriz Rocha
                Treinamento t8 = new Treinamento();
                t8.setNomeFuncionario("Beatriz Rocha");
                t8.setCargo("Supervisora");
                t8.setCurso("NR-12");
                t8.setDataConclusao(LocalDate.of(2022, 10, 2));
                t8.setValidade(LocalDate.of(2023, 10, 2));
                t8.setStatus(StatusTreinamento.VENCIDO);
                treRepo.save(t8);

                // 9) Lucas Almeida
                Treinamento t9 = new Treinamento();
                t9.setNomeFuncionario("Lucas Almeida");
                t9.setCargo("Técnico");
                t9.setCurso("NR-33");
                t9.setDataConclusao(LocalDate.of(2023, 1, 25));
                t9.setValidade(LocalDate.of(2024, 1, 25));
                t9.setStatus(StatusTreinamento.VENCIDO);
                treRepo.save(t9);

                // 10) Fernanda Gomes
                Treinamento t10 = new Treinamento();
                t10.setNomeFuncionario("Fernanda Gomes");
                t10.setCargo("Operadora");
                t10.setCurso("NR-35");
                t10.setDataConclusao(LocalDate.of(2024, 5, 21));
                t10.setValidade(LocalDate.of(2025, 5, 21));
                t10.setStatus(StatusTreinamento.VALIDO);
                treRepo.save(t10);

                System.out.println("Seed de treinamentos concluída.");
            } catch (Exception e) {
                System.err.println("Seed de treinamentos falhou: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            }
        };
    }
}
