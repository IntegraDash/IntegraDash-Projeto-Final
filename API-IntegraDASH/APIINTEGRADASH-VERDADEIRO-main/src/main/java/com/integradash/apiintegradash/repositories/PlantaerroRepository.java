package com.integradash.apiintegradash.repositories;

import com.integradash.apiintegradash.models.PlantaerroModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PlantaerroRepository extends JpaRepository<PlantaerroModel, UUID> {
    PlantaerroModel findByDescricao(String descricao);
}
