package com.integradash.apiintegradash.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "tb_planta_erro")
public class PlantaerroModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_erro", referencedColumnName = "id")
    private ErroModel erro;

    @ManyToOne
    @JoinColumn(name = "id_planta", referencedColumnName = "id")
    private PlantaModel planta;
}
