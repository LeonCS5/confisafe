package com.confisafe.service;

import com.confisafe.model.Funcionario;
import com.confisafe.repository.FuncionarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {

    private final FuncionarioRepository repo;

    public FuncionarioService(FuncionarioRepository repo) {
        this.repo = repo;
    }

    public List<Funcionario> listarTodos() {
        return repo.findAll();
    }

    public Funcionario buscarPorId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Funcionário não encontrado"));
    }

    public Funcionario criar(Funcionario funcionario) {
        funcionario.setId(null); // garante create e não update
        if (funcionario.getAtivo() == null) {
            funcionario.setAtivo(true);
        }
        return repo.save(funcionario);
    }

    public Funcionario atualizar(Long id, Funcionario dadosAtualizados) {
        Funcionario existente = buscarPorId(id);

        existente.setNomeCompleto(dadosAtualizados.getNomeCompleto());
        existente.setCargo(dadosAtualizados.getCargo());
        existente.setDepartamento(dadosAtualizados.getDepartamento());
        existente.setEmail(dadosAtualizados.getEmail());
        existente.setTelefone(dadosAtualizados.getTelefone());
        existente.setAtivo(dadosAtualizados.getAtivo());

        return repo.save(existente);
    }

    public void deletar(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Funcionário não encontrado");
        }
        repo.deleteById(id);
    }
}
