package com.integradash.apiintegradash.repositories;

import com.integradash.apiintegradash.models.AlertaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface AlertaRepository extends JpaRepository<AlertaModel, UUID> {
    AlertaModel findByNomealerta(String nomealerta);
}