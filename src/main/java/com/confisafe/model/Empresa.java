package com.confisafe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Entity
@Table(name = "empresas")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Razão Social é obrigatória")
    @Column(nullable = false)
    private String razaoSocial;

    @NotBlank(message = "CNPJ é obrigatório")
    @Pattern(regexp = "\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}", message = "CNPJ deve estar no formato: 00.000.000/0000-00")
    @Column(nullable = false, unique = true)
    private String cnpj;

    @Email(message = "E-mail corporativo deve ser válido")
    @NotBlank(message = "E-mail corporativo é obrigatório")
    @Column(nullable = false, unique = true)
    private String emailCorporativo;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "\\(\\d{2}\\) \\d{4,5}-\\d{4}", message = "Telefone deve estar no formato: (00) 00000-0000")
    @Column(nullable = false)
    private String telefone;

    // Responsável
    @NotBlank(message = "Nome do responsável é obrigatório")
    @Column(nullable = false)
    private String nomeResponsavel;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF deve estar no formato: 000.000.000-00")
    @Column(nullable = false, unique = true)
    private String cpf;

    @NotBlank(message = "Cargo é obrigatório")
    @Column(nullable = false)
    private String cargo;

    // Senha
    @NotBlank(message = "Senha é obrigatória")
    @Column(nullable = false)
    private String senha;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column
    private LocalDateTime dataAtualizacao;

    @PrePersist
    protected void onCreate() {
        dataCadastro = LocalDateTime.now();
        dataAtualizacao = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        dataAtualizacao = LocalDateTime.now();
    }

    // Construtores
    public Empresa() {}

    public Empresa(String razaoSocial, String cnpj, String emailCorporativo, String telefone,
                   String nomeResponsavel, String cpf, String cargo, String senha) {
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.emailCorporativo = emailCorporativo;
        this.telefone = telefone;
        this.nomeResponsavel = nomeResponsavel;
        this.cpf = cpf;
        this.cargo = cargo;
        this.senha = senha;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEmailCorporativo() {
        return emailCorporativo;
    }

    public void setEmailCorporativo(String emailCorporativo) {
        this.emailCorporativo = emailCorporativo;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
}
