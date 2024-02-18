package com.integradash.apiintegradash.dtos;

import jakarta.validation.constraints.NotBlank;

public record PlantaDto(

        @NotBlank String nomeplanta,

        @NotBlank String endereco_planta
) {
}
