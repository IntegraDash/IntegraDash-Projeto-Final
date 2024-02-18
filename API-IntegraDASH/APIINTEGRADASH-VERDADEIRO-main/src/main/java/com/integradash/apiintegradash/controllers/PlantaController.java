package com.integradash.apiintegradash.controllers;

import com.integradash.apiintegradash.dtos.PlantaDto;
import com.integradash.apiintegradash.models.ErroModel;
import com.integradash.apiintegradash.models.PlantaModel;
import com.integradash.apiintegradash.repositories.PlantaRepository;
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
@RequestMapping(value = "/planta", produces = {"application/json"})
public class PlantaController {

    @Autowired
    PlantaRepository plantaRepository;

    @GetMapping
    public ResponseEntity<List<PlantaModel>> listaPlanta() {
        return ResponseEntity.status(HttpStatus.OK).body(plantaRepository.findAll());
    }

    @GetMapping("/{idPlanta}")
    public ResponseEntity<Object> exibirPlanta(@PathVariable(value = "idPlanta")UUID id) {

        Optional<PlantaModel> plantaBuscada = plantaRepository.findById(id);

        if (plantaBuscada.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Planta não encontrada");
        }

        return ResponseEntity.status(HttpStatus.OK).body(plantaBuscada.get());
    }

    @PostMapping
    public ResponseEntity<Object> cadastrarPlanta(@RequestBody @Valid PlantaDto plantaDto) {

        if (plantaRepository.findByNomeplanta(plantaDto.nomeplanta()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Essa planta já está cadastrada");
        }

        PlantaModel planta = new PlantaModel();
        BeanUtils.copyProperties(plantaDto, planta);

        return ResponseEntity.status(HttpStatus.CREATED).body(plantaRepository.save(planta));
    }

    @PutMapping("/{idPlanta}")
    public ResponseEntity<Object> editarPlanta(@PathVariable(value = "idPlanta") UUID id, @RequestBody @Valid PlantaDto plantaDto) {
       Optional<PlantaModel> plantaBuscada = plantaRepository.findById(id);

       if (plantaBuscada.isEmpty()) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Planta não encontrada");
       }

       PlantaModel planta = plantaBuscada.get();
       BeanUtils.copyProperties(plantaDto, planta);

       return ResponseEntity.status(HttpStatus.CREATED).body(plantaRepository.save(planta));
    }

    @DeleteMapping("/{idPlanta}")
    public ResponseEntity<Object> deletarPlanta(@PathVariable(value = "idPlanta") UUID id) {
        Optional<PlantaModel> plantaBuscada = plantaRepository.findById(id);

        if ( plantaBuscada.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Planta não encontrado");
        }

        plantaRepository.delete(plantaBuscada.get());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Planta deletado com sucesso!");
    }


}
