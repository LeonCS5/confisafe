package com.confisafe.dto;

public class CadastroResponse {

    private boolean sucesso;
    private String mensagem;
    private Long empresaId;

    // Construtores
    public CadastroResponse() {}

    public CadastroResponse(boolean sucesso, String mensagem) {
        this.sucesso = sucesso;
        this.mensagem = mensagem;
    }

    public CadastroResponse(boolean sucesso, String mensagem, Long empresaId) {
        this.sucesso = sucesso;
        this.mensagem = mensagem;
        this.empresaId = empresaId;
    }

    // Getters e Setters
    public boolean isSucesso() {
        return sucesso;
    }

    public void setSucesso(boolean sucesso) {
        this.sucesso = sucesso;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Long getEmpresaId() {
        return empresaId;
    }

    public void setEmpresaId(Long empresaId) {
        this.empresaId = empresaId;
    }
}
