package com.integradash.apiintegradash.controllers;

import com.integradash.apiintegradash.dtos.EstrategiaDto;
import com.integradash.apiintegradash.dtos.PlantaerroDto;
import com.integradash.apiintegradash.models.*;
import com.integradash.apiintegradash.repositories.ErroRepository;
import com.integradash.apiintegradash.repositories.PlantaRepository;
import com.integradash.apiintegradash.repositories.PlantaerroRepository;
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
@RequestMapping(value = "/plantaerro", produces = {"application/json"})
public class PlantaerroController {

    @Autowired
    PlantaerroRepository plantaerroRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private PlantaRepository plantaRepository;

    @Autowired
    private ErroRepository erroRepository;

    @GetMapping
    public ResponseEntity<List<PlantaerroModel>> listarEstrategia() {
        return ResponseEntity.status(HttpStatus.OK).body(plantaerroRepository.findAll());
    }

    @GetMapping("/{idPlantaerro}")
    public ResponseEntity<Object> exibirPlantaerro(@PathVariable(value = "idPlantaerro") UUID id) {
        Optional<PlantaerroModel> plantaerroBuscada = plantaerroRepository.findById(id);

        if (plantaerroBuscada.isEmpty()) {
            // Retornar alerta não encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Alerta não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(plantaerroBuscada.get());
    }

    @PostMapping
    public ResponseEntity<Object> cadastrarPlantaerro(@RequestBody @Valid PlantaerroDto plantaerroDto) {

//        if (plantaerroRepository.findByDescricao(plantaerroDto.descricao()) != null) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Esse plantaerro já está cadastrado");
//        }

        PlantaerroModel plantaerro = new PlantaerroModel();
        BeanUtils.copyProperties(plantaerroDto, plantaerro);

        Optional<PlantaModel> plantaerroPlanta = plantaRepository.findById(plantaerroDto.id_planta());

        if (plantaerroPlanta.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Planta não encontrada");

        plantaerro.setPlanta(plantaerroPlanta.get());

        Optional<ErroModel> plantaerroErro = erroRepository.findById(plantaerroDto.id_erro());

        if (plantaerroErro.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro não encontrado");

        plantaerro.setErro(plantaerroErro.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(plantaerroRepository.save(plantaerro));
    }

    @PutMapping("/{idPlantaerro}")
    public ResponseEntity<Object> editarPlantaerro(@PathVariable(value = "idPlantaerro") UUID id, @RequestBody @Valid PlantaerroDto plantaerroDto) {
        Optional<PlantaerroModel> plantaerroBuscado = plantaerroRepository.findById(id);

        if ( plantaerroBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plantaerro não encontrada");
        }

        PlantaerroModel plantaerro = plantaerroBuscado.get();
        BeanUtils.copyProperties(plantaerroDto, plantaerro);

        return ResponseEntity.status(HttpStatus.CREATED).body(plantaerroRepository.save(plantaerro));
    }

    @DeleteMapping("/{idPlantaerro}")
    public ResponseEntity<Object> deletarPlantaerro(@PathVariable(value = "idPlantaerro") UUID id) {
        Optional<PlantaerroModel> plantaerroBuscado = plantaerroRepository.findById(id);

        if ( plantaerroBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plantaerro não encontrado");
        }

        plantaerroRepository.delete(plantaerroBuscado.get());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Plantaerro deletado com sucesso!");
    }

}
