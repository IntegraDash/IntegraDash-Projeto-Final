package com.integradash.apiintegradash.controllers;


import com.integradash.apiintegradash.dtos.AlertaDto;
import com.integradash.apiintegradash.dtos.EstrategiaDto;
import com.integradash.apiintegradash.models.AlertaModel;
import com.integradash.apiintegradash.models.ErroModel;
import com.integradash.apiintegradash.models.EstrategiaModel;
import com.integradash.apiintegradash.models.UsuarioModel;
import com.integradash.apiintegradash.repositories.ErroRepository;
import com.integradash.apiintegradash.repositories.EstrategiaRepository;
import com.integradash.apiintegradash.repositories.UsuarioRepository;
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
@RequestMapping(value = "/estrategias", produces = {"application/json"})
public class EstrategiaController {

    @Autowired
    EstrategiaRepository estrategiaRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ErroRepository erroRepository;

    @GetMapping
    public ResponseEntity<List<EstrategiaModel>> listarEstrategia() {
        return ResponseEntity.status(HttpStatus.OK).body(estrategiaRepository.findAll());
    }

    @GetMapping("/{idEstrategia}")
    public ResponseEntity<Object> exibirEstrategia(@PathVariable(value = "idEstrategia") UUID id) {
        Optional<EstrategiaModel> estrategiaBuscada = estrategiaRepository.findById(id);

        if (estrategiaBuscada.isEmpty()) {
            // Retornar alerta não encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estrategia não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(estrategiaBuscada.get());
    }

    @PostMapping
    public ResponseEntity<Object> cadastrarEstrategia(@RequestBody @Valid EstrategiaDto estrategiaDto) {

        if (estrategiaRepository.findByNomeestrategia(estrategiaDto.nomeestrategia()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Essa estratégia já está cadastrado");
        }

        EstrategiaModel estrategia = new EstrategiaModel();
        BeanUtils.copyProperties(estrategiaDto, estrategia);

        Optional<UsuarioModel> estrategiaUsuario = usuarioRepository.findById(estrategiaDto.id_usuario());

        if (estrategiaUsuario.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Planta não encontrada");

        estrategia.setUsuario(estrategiaUsuario.get());

        Optional<ErroModel> estrategiaErro = erroRepository.findById(estrategiaDto.id_erro());

        if (estrategiaErro.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro não encontrado");

        estrategia.setErro(estrategiaErro.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(estrategiaRepository.save(estrategia));
    }

    @PutMapping("/{idEstrategia}")
    public ResponseEntity<Object> editarEstrategia(@PathVariable(value = "idEstrategia") UUID id, @RequestBody @Valid EstrategiaDto estrategiaDto) {
        Optional<EstrategiaModel> estrategiaBuscado = estrategiaRepository.findById(id);

        if ( estrategiaBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estrategia não encontrada");
        }

        EstrategiaModel estrategia = estrategiaBuscado.get();
        BeanUtils.copyProperties(estrategiaDto, estrategia);

        return ResponseEntity.status(HttpStatus.CREATED).body(estrategiaRepository.save(estrategia));
    }

    @DeleteMapping("/{idEstrategia}")
    public ResponseEntity<Object> deletarEstrategia(@PathVariable(value = "idEstrategia") UUID id) {
        Optional<EstrategiaModel> estrategiaBuscado = estrategiaRepository.findById(id);

        if ( estrategiaBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estrategia não encontrado");
        }

        estrategiaRepository.delete(estrategiaBuscado.get());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Estrategia deletado com sucesso!");
    }


}
