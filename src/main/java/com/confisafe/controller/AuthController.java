package com.confisafe.controller;

import com.confisafe.dto.ChangePasswordRequest;
import com.confisafe.dto.LoginRequest;
import com.confisafe.dto.LoginResponse;
import com.confisafe.dto.NovoUsuarioRequest;
import com.confisafe.dto.UpdateProfileRequest;
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
        Usuario usuario = new Usuario(
            request.getEmail(),
            request.getSenha(),
            request.getNomeCompleto(),
            request.getCargo(),
            request.getDepartamento(),
            request.getTelefone(),
            request.getRamal()
        ); // simples, sem hash
        
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

    @PostMapping("/alterar-senha")
    public ResponseEntity<LoginResponse> alterarSenha(@Valid @RequestBody ChangePasswordRequest request) {
        // Busca o usuário pelo e-mail
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
        
        // Verifica se o usuário existe
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponse(false, "Usuário não encontrado"));
        }
        
        Usuario usuario = usuarioOpt.get();
        
        // Verifica se a senha atual está correta
        if (!usuario.getSenha().equals(request.getSenhaAtual())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "Senha atual inválida"));
        }
        
        // Valida a nova senha (mínimo 8 caracteres, com letras e números)
        if (request.getNovaSenha().length() < 8) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(false, "A nova senha deve ter no mínimo 8 caracteres"));
        }
        
        boolean hasLetter = request.getNovaSenha().matches(".*[a-zA-Z].*");
        boolean hasNumber = request.getNovaSenha().matches(".*\\d.*");
        
        if (!hasLetter || !hasNumber) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(false, "A senha deve conter letras e números"));
        }
        
        // Atualiza a senha
        usuario.setSenha(request.getNovaSenha());
        usuarioRepository.save(usuario);
        
        return ResponseEntity.ok(new LoginResponse(true, "Senha alterada com sucesso"));
    }

    @GetMapping("/perfil")
    public ResponseEntity<Usuario> obterPerfil(@RequestParam String email) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Usuario u = usuarioOpt.get();
        // não expor senha
        u.setSenha(null);
        return ResponseEntity.ok(u);
    }

    @PutMapping("/atualizar-perfil")
    public ResponseEntity<LoginResponse> atualizarPerfil(@Valid @RequestBody UpdateProfileRequest request) {
        String original = request.getOriginalEmail();
        if (original == null || original.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(false, "E-mail original é obrigatório"));
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(original);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponse(false, "Usuário não encontrado"));
        }

        Usuario u = usuarioOpt.get();

        // Se o usuário tentou trocar para outro e-mail, verificar disponibilidade
        String novoEmail = request.getEmail();
        if (novoEmail != null && !novoEmail.equalsIgnoreCase(original)) {
            if (usuarioRepository.existsByEmail(novoEmail)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new LoginResponse(false, "E-mail já está em uso"));
            }
            u.setEmail(novoEmail);
        }

        u.setNomeCompleto(request.getNomeCompleto());
        u.setCargo(request.getCargo());
        u.setDepartamento(request.getDepartamento());
        u.setTelefone(request.getTelefone());
        u.setRamal(request.getRamal());
        u.setFotoPerfil(request.getFotoPerfil());

        usuarioRepository.save(u);
        return ResponseEntity.ok(new LoginResponse(true, "Perfil atualizado com sucesso"));
    }
}
