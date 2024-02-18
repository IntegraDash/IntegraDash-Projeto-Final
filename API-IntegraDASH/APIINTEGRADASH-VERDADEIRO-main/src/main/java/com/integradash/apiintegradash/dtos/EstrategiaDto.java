package com.integradash.apiintegradash.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

public record EstrategiaDto(
        @NotBlank String nomeestrategia,

        @NotNull
        @DateTimeFormat(pattern = "yyyy-MM-dd")Date data_estrategia,

        @NotBlank String descricao_estrategia,

        @NotNull UUID id_usuario,

        @NotNull UUID id_erro
        ) {
}
