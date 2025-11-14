package com.confisafe.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class CadastroRequest {

    @NotBlank(message = "Razão Social é obrigatória")
    private String razaoSocial;

    @NotBlank(message = "CNPJ é obrigatório")
    @Pattern(regexp = "\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}", message = "CNPJ deve estar no formato: 00.000.000/0000-00")
    private String cnpj;

    @Email(message = "E-mail corporativo deve ser válido")
    @NotBlank(message = "E-mail corporativo é obrigatório")
    private String emailCorporativo;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "\\(\\d{2}\\) \\d{4,5}-\\d{4}", message = "Telefone deve estar no formato: (00) 00000-0000")
    private String telefone;

    @NotBlank(message = "Nome do responsável é obrigatório")
    private String nomeResponsavel;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF deve estar no formato: 000.000.000-00")
    private String cpf;

    @NotBlank(message = "Cargo é obrigatório")
    private String cargo;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    @NotBlank(message = "Confirmação de senha é obrigatória")
    private String confirmarSenha;

    // Construtores
    public CadastroRequest() {}

    public CadastroRequest(String razaoSocial, String cnpj, String emailCorporativo, String telefone,
                          String nomeResponsavel, String cpf, String cargo, String senha, String confirmarSenha) {
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.emailCorporativo = emailCorporativo;
        this.telefone = telefone;
        this.nomeResponsavel = nomeResponsavel;
        this.cpf = cpf;
        this.cargo = cargo;
        this.senha = senha;
        this.confirmarSenha = confirmarSenha;
    }

    // Getters e Setters
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

    public String getConfirmarSenha() {
        return confirmarSenha;
    }

    public void setConfirmarSenha(String confirmarSenha) {
        this.confirmarSenha = confirmarSenha;
    }
}
