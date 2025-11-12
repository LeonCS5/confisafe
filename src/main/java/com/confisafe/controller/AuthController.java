package com.confisafe.controller;

import com.confisafe.dto.LoginRequest;
import com.confisafe.dto.LoginResponse;
import com.confisafe.dto.NovoUsuarioRequest;
import com.confisafe.model.Usuario;
import com.confisafe.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/registrar")
    public ResponseEntity<LoginResponse> registrar(@Valid @RequestBody NovoUsuarioRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(false, "E-mail já cadastrado"));
        }
        Usuario usuario = new Usuario(request.getEmail(), request.getSenha()); // simples, sem hash
        usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new LoginResponse(true, "Usuário criado com sucesso"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getSenha().equals(request.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "E-mail ou senha inválidos"));
        }
        return ResponseEntity.ok(new LoginResponse(true, "Login realizado com sucesso"));
    }
}
