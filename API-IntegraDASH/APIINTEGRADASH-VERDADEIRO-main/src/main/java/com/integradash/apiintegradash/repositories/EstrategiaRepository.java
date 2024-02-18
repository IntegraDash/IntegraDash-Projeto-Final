package com.integradash.apiintegradash.repositories;

import com.integradash.apiintegradash.models.EstrategiaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EstrategiaRepository extends JpaRepository<EstrategiaModel, UUID> {
    EstrategiaModel findByNomeestrategia(String nomestrategia);
}
