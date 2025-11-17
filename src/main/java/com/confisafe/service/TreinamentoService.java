package com.confisafe.service;

import com.confisafe.repository.TreinamentoRepository;
import com.confisafe.model.Treinamento;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TreinamentoService {

    private final TreinamentoRepository repository;

    public TreinamentoService(TreinamentoRepository repository) {
        this.repository = repository;
    }

    public List<Treinamento> listarTodos() {
        return repository.findAll();
    }

    public Treinamento salvar(Treinamento t) {
        return repository.save(t);
    }
    
    public void deletar(Long id) {
        repository.deleteById(id);
    }

}

