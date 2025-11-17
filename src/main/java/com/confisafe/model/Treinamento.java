package com.confisafe.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "treinamento")
public class Treinamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_funcionario")
    private String nomeFuncionario;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "curso")
    private String curso;

    @Column(name = "data_conclusao")
    private LocalDate dataConclusao;

    @Column(name = "validade")
    private LocalDate validade;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusTreinamento status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomeFuncionario() { return nomeFuncionario; }
    public void setNomeFuncionario(String nomeFuncionario) { this.nomeFuncionario = nomeFuncionario; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }

    public LocalDate getDataConclusao() { return dataConclusao; }
    public void setDataConclusao(LocalDate dataConclusao) { this.dataConclusao = dataConclusao; }

    public LocalDate getValidade() { return validade; }
    public void setValidade(LocalDate validade) { this.validade = validade; }

    public StatusTreinamento getStatus() { return status; }
    public void setStatus(StatusTreinamento status) { this.status = status; }
}
