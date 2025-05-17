package com.projetocrud.backend.controller;

import com.projetocrud.backend.dto.ProdutoRequest;
import com.projetocrud.backend.model.Produto;
import com.projetocrud.backend.model.User;
import com.projetocrud.backend.repository.ProdutoRepository;
import com.projetocrud.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarProduto(@RequestBody ProdutoRequest request) {
        User usuario = null;

        if (request.nome() == null || request.nome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Nome do produto é obrigatório");
        }

        if (request.quantidade() < 0) {
            return ResponseEntity.badRequest().body("Quantidade não pode ser negativa");
        }

        // Só busca o usuário se o ID for fornecido
        if (request.usuarioId() != null) {
            usuario = userRepository.findById(request.usuarioId()).orElse(null);

            // Opcional: Valida se o usuário existe
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Usuário não encontrado");
            }
        }

        Produto produto = new Produto(
                request.nome(),
                request.codigoProduto(),
                request.fabricante(),
                request.tipo(),
                request.quantidade(),
                request.preco(),
                usuario // Pode ser null
        );

        Produto salvo = produtoRepository.save(produto);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = produtoRepository.findAll();
        return ResponseEntity.ok(produtos);
    }
}