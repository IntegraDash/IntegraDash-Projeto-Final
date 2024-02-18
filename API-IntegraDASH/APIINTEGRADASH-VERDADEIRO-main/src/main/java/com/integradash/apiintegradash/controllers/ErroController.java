package com.integradash.apiintegradash.controllers;

import com.integradash.apiintegradash.dtos.ErroDto;
import com.integradash.apiintegradash.models.ErroModel;
import com.integradash.apiintegradash.repositories.ErroRepository;
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
@RequestMapping(value = "/erro", produces = {"application/json"})
public class ErroController {
    @Autowired
    ErroRepository erroRepository;

    @GetMapping
    public ResponseEntity<List<ErroModel>> listarErro() {
        return ResponseEntity.status(HttpStatus.OK).body(erroRepository.findAll());
    }

    @GetMapping("/{idErro}")
    public ResponseEntity<Object> exibirErro(@PathVariable(value = "idErro") UUID id) {

        Optional<ErroModel> erroBuscado = erroRepository.findById(id);

        if (erroBuscado.isEmpty()) {
            // Retornar usuário não encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(erroBuscado.get());
    }

    @PostMapping
    public ResponseEntity<Object> cadastrarErro(@RequestBody @Valid ErroDto erroDto) {

       // System.out.println(erroRepository.findByNomeerro(erroDto.nomeerro()));
//        if ( erroRepository.findByNomeerro(erroDto.nomeerro()) != null ) {
//            // Não pode cadastrar
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Esse erro já está cadastrado");
//        }

        ErroModel erro = new ErroModel();
        BeanUtils.copyProperties(erroDto, erro);

        return ResponseEntity.status(HttpStatus.CREATED).body(erroRepository.save(erro));
    }

    @PutMapping("/{idErro}")
    public ResponseEntity<Object> editarErro(@PathVariable(value = "idErro") UUID id, @RequestBody @Valid ErroDto erroDto) {
        Optional<ErroModel> erroBuscado = erroRepository.findById(id);

        if ( erroBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro não encontrado");
        }

        ErroModel erro = erroBuscado.get();
        BeanUtils.copyProperties(erroDto, erro);

        return ResponseEntity.status(HttpStatus.CREATED).body(erroRepository.save(erro));
    }

    @DeleteMapping("/{idErro}")
    public ResponseEntity<Object> deletarErro(@PathVariable(value = "idErro") UUID id) {
        Optional<ErroModel> erroBuscado = erroRepository.findById(id);

        if ( erroBuscado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro não encontrado");
        }

        erroRepository.delete(erroBuscado.get());

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Erro deletado com sucesso!");
    }
}
