package com.integradash.apiintegradash.repositories;

import com.integradash.apiintegradash.models.PlantaModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PlantaRepository extends JpaRepository<PlantaModel, UUID> {
    PlantaModel findByNomeplanta(String nomeplanta);
}
