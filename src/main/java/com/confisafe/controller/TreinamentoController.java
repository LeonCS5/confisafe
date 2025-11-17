package com.confisafe.controller;

import com.confisafe.model.Treinamento;
import com.confisafe.service.TreinamentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/treinamentos")
@CrossOrigin(origins = "*")
public class TreinamentoController {

    private final TreinamentoService service;

    public TreinamentoController(TreinamentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Treinamento> getAll() {
        return service.listarTodos();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletar(id);
    }
}