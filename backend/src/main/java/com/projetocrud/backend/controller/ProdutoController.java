package com.projetocrud.backend.controller;

import com.projetocrud.backend.dto.ProdutoRequest;
import com.projetocrud.backend.model.Produto;
import com.projetocrud.backend.model.User;
import com.projetocrud.backend.repository.ProdutoRepository;
import com.projetocrud.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:3000") // ajuste se seu front estiver em outro lugar
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarProduto(@RequestBody ProdutoRequest request) {
        // Verifica se o usuário existe
        User usuario = userRepository.findById(request.usuarioId()).orElse(null);

        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }

        Produto produto = new Produto(
                request.nome(),
                request.codigoProduto(),
                request.fabricante(),
                request.tipo(),
                request.quantidade(),
                request.preco(),
                usuario
        );

        Produto salvo = produtoRepository.save(produto);
        return ResponseEntity.ok(salvo);
    }
}
