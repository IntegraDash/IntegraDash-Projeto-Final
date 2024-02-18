package com.integradash.apiintegradash.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public record ErroDto(
        @NotBlank String nomeerro,

        @NotNull
        @DateTimeFormat(pattern="yyyy-MM-dd") Date data_erro,

        @NotBlank String descricao_erro,
        @NotBlank String status_erro
) {
}
