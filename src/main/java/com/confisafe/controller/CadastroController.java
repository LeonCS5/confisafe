package com.confisafe.controller;

import com.confisafe.dto.CadastroRequest;
import com.confisafe.dto.CadastroResponse;
import com.confisafe.model.Empresa;
import com.confisafe.repository.EmpresaRepository;
import com.confisafe.repository.UsuarioRepository;
import com.confisafe.model.Usuario;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cadastro")
@CrossOrigin(origins = "*")
public class CadastroController {

    private final EmpresaRepository empresaRepository;
    private final UsuarioRepository usuarioRepository;

    public CadastroController(EmpresaRepository empresaRepository, UsuarioRepository usuarioRepository) {
        this.empresaRepository = empresaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<?> registrarEmpresa(@Valid @RequestBody CadastroRequest request) {
        
        // Validar se as senhas conferem
        if (!request.getSenha().equals(request.getConfirmarSenha())) {
            Map<String, String> erro = new HashMap<>();
            erro.put("sucesso", "false");
            erro.put("mensagem", "As senhas não conferem");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }

        // Validar comprimento mínimo da senha
        if (request.getSenha().length() < 8) {
            Map<String, String> erro = new HashMap<>();
            erro.put("sucesso", "false");
            erro.put("mensagem", "A senha deve ter no mínimo 8 caracteres");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }

        // Verificar se CNPJ já existe
        if (empresaRepository.existsByCnpj(request.getCnpj())) {
            Map<String, String> erro = new HashMap<>();
            erro.put("sucesso", "false");
            erro.put("mensagem", "CNPJ já cadastrado no sistema");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }

        // Verificar se E-mail corporativo já existe
        if (empresaRepository.existsByEmailCorporativo(request.getEmailCorporativo())) {
            Map<String, String> erro = new HashMap<>();
            erro.put("sucesso", "false");
            erro.put("mensagem", "E-mail corporativo já cadastrado no sistema");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }

        // Verificar se CPF já existe
        if (empresaRepository.existsByCpf(request.getCpf())) {
            Map<String, String> erro = new HashMap<>();
            erro.put("sucesso", "false");
            erro.put("mensagem", "CPF já cadastrado no sistema");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }

        // Criar nova empresa
        try {
            Empresa empresa = new Empresa(
                request.getRazaoSocial(),
                request.getCnpj(),
                request.getEmailCorporativo(),
                request.getTelefone(),
                request.getNomeResponsavel(),
                request.getCpf(),
                request.getCargo(),
                request.getSenha()
            );

            Empresa empresaSalva = empresaRepository.save(empresa);

            // Criar usuário automático para o e-mail corporativo (permite login)
            try {
                if (!usuarioRepository.existsByEmail(request.getEmailCorporativo())) {
                    Usuario novoUsuario = new Usuario(request.getEmailCorporativo(), request.getSenha());
                    usuarioRepository.save(novoUsuario);
                }
            } catch (Exception e) {
                // Não bloquear o fluxo principal se a criação do usuário falhar;
                // ainda retornamos sucesso do cadastro da empresa e logamos o erro.
                System.err.println("Falha ao criar usuário automático: " + e.getMessage());
            }

            CadastroResponse response = new CadastroResponse(
                true,
                "Empresa cadastrada com sucesso! Você já pode fazer login.",
                empresaSalva.getId()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("sucesso", "false");
            erro.put("mensagem", "Erro ao salvar empresa: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
    }
}
