package com.integradash.apiintegradash.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record PlantaerroDto(
        @NotBlank String descricao,

        @NotNull UUID id_erro,

        @NotNull UUID id_planta
) {
}
