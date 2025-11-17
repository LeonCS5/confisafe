package com.confisafe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String senha;

    // campos adicionais de perfil
    @Column(name = "nome_completo")
    private String nomeCompleto;

    private String cargo;

    private String departamento;

    private String telefone;

    private String ramal;

    @Lob
    @Column(name = "foto_perfil")
    private String fotoPerfil;

    public Usuario() {}

    public Usuario(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }

    public Usuario(String email, String senha, String nomeCompleto, String cargo, String departamento, String telefone, String ramal) {
        this.email = email;
        this.senha = senha;
        this.nomeCompleto = nomeCompleto;
        this.cargo = cargo;
        this.departamento = departamento;
        this.telefone = telefone;
        this.ramal = ramal;
    }

    public Long getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getRamal() { return ramal; }
    public void setRamal(String ramal) { this.ramal = ramal; }

    public String getFotoPerfil() {return fotoPerfil;}
    public void setFotoPerfil(String fotoPerfil) {this.fotoPerfil = fotoPerfil;}
}

