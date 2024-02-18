package com.integradash.apiintegradash.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

public record AlertaDto(
        @NotBlank String nomealerta,
        @NotBlank String nivel_criticidade ,
        @NotNull
        @DateTimeFormat(pattern="yyyy-MM-dd") Date data_alerta,
        @NotBlank String status_alerta,
        @NotBlank String descricao_alerta,
        @NotNull UUID id_erro

) {
}
