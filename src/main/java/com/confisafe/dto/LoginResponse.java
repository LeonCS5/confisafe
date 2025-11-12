package com.confisafe.dto;

public class LoginResponse {

    private boolean autenticado;
    private String mensagem;

    public LoginResponse() {}

    public LoginResponse(boolean autenticado, String mensagem) {
        this.autenticado = autenticado;
        this.mensagem = mensagem;
    }

    public boolean isAutenticado() {
        return autenticado;
    }

    public void setAutenticado(boolean autenticado) {
        this.autenticado = autenticado;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
