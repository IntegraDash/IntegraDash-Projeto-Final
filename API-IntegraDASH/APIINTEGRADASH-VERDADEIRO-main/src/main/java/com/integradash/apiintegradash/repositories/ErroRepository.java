package com.integradash.apiintegradash.repositories;

import com.integradash.apiintegradash.models.ErroModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ErroRepository extends JpaRepository<ErroModel, UUID> {
    ErroModel findByNomeerro(String nomeerro);
}
