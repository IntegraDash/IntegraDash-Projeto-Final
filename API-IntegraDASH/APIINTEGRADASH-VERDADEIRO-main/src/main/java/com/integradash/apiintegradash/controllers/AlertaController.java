package com.integradash.apiintegradash.controllers;

import com.integradash.apiintegradash.dtos.AlertaDto;
import com.integradash.apiintegradash.models.AlertaModel;
import com.integradash.apiintegradash.models.ErroModel;
import com.integradash.apiintegradash.repositories.AlertaRepository;
import com.integradash.apiintegradash.repositories.ErroRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/alertas", produces = {"application/json"})
public class AlertaController {
    @Autowired
    AlertaRepository alertaRepository;

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ErroRepository erroRepository;

    @GetMapping
    public ResponseEntity<List<AlertaModel>> listarAlertas() {
        return ResponseEntity.status(HttpStatus.OK).body(alertaRepository.findAll());
    }

    @GetMapping("/{idAlerta}")
    public ResponseEntity<Object> exibirAlerta(@PathVariable(value = "idAlerta") UUID id) {
        Optional<AlertaModel> alertaBuscado = alertaRepository.findById(id);

        if (alertaBuscado.isEmpty()) {
            // Retornar alerta não encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Alerta não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(alertaBuscado.get());
    }

    @PostMapping
    public ResponseEntity<Object> cadastrarAlerta(@RequestBody @Valid AlertaDto alertaDto) {

//        if ( alertaRepository.findByNomealerta(alertaDto.nomealerta()) != null ) {
//            // Não pode cadastrar
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Esse alerta já está cadastrado");
//        }

        AlertaModel alerta = new AlertaModel();
        BeanUtils.copyProperties(alertaDto, alerta);

        Optional<ErroModel> erroAlerta = erroRepository.findById(alertaDto.id_erro());

        if (erroAlerta.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro não encontrado");

        alerta.setErro(erroAlerta.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(alertaRepository.save(alerta));
    }

    @PutMapping("/{idAlerta}")
    public ResponseEntity<Object> editarAlerta(@PathVariable(value = "idAlerta") UUID id, @RequestBody @Valid AlertaDto alertaDto) {
        Optional<AlertaModel> alertaBuscado = alertaRepository.findById(id);

        if ( alertaBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Alerta não encontrado");
        }

        AlertaModel alerta = alertaBuscado.get();
        BeanUtils.copyProperties(alertaDto, alerta);

        return ResponseEntity.status(HttpStatus.CREATED).body(alertaRepository.save(alerta));
    }

    @DeleteMapping("/{idAlerta}")
    public ResponseEntity<Object> deletarAlerta(@PathVariable(value = "idAlerta") UUID id) {
        Optional<AlertaModel> alertaBuscado = alertaRepository.findById(id);

        if ( alertaBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Alerta não encontrado");
        }

        alertaRepository.delete(alertaBuscado.get());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Alerta deletado com sucesso!");
    }
}
