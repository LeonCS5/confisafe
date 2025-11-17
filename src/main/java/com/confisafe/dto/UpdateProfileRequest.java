package com.confisafe.dto;

public class UpdateProfileRequest {

    private String originalEmail; // email atual (identificador)
    private String email; // novo email (pode ser igual ao original)
    private String nomeCompleto;
    private String cargo;
    private String departamento;
    private String telefone;
    private String ramal;
    private String fotoPerfil;

    public UpdateProfileRequest() {}

    public String getOriginalEmail() { return originalEmail; }
    public void setOriginalEmail(String originalEmail) { this.originalEmail = originalEmail; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

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
