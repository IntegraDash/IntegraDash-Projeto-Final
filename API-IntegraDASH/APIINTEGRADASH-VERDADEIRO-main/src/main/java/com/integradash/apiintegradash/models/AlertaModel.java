package com.integradash.apiintegradash.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "tb_alerta")
public class AlertaModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    private String nomealerta;
    private String nivel_criticidade;

    private String status_alerta;
    private String descricao_alerta;
    @Temporal(TemporalType.DATE)
    private Date data_alerta;

    @OneToOne
    @JoinColumn(name = "id_erro", referencedColumnName = "id")
    private ErroModel erro;

}