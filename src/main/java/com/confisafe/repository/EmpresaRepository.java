package com.confisafe.repository;

import com.confisafe.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    Optional<Empresa> findByCnpj(String cnpj);

    Optional<Empresa> findByEmailCorporativo(String emailCorporativo);

    Optional<Empresa> findByCpf(String cpf);

    boolean existsByCnpj(String cnpj);

    boolean existsByEmailCorporativo(String emailCorporativo);

    boolean existsByCpf(String cpf);
}
