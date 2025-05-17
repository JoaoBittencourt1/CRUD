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
import java.util.Optional;

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

        if (request.usuarioId() != null) {
            usuario = userRepository.findById(request.usuarioId()).orElse(null);

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
                usuario
        );

        Produto salvo = produtoRepository.save(produto);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = produtoRepository.findAll();
        return ResponseEntity.ok(produtos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<Produto> buscarProduto(
            @RequestParam String termo) {


        if (termo.matches("\\d+")) {
            Optional<Produto> porId = produtoRepository.findById(Long.parseLong(termo));
            if (porId.isPresent()) return ResponseEntity.ok(porId.get());
        }


        List<Produto> porNome = produtoRepository.findByNomeContaining(termo);
        if (!porNome.isEmpty()) {
            return ResponseEntity.ok(porNome.get(0));
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(
            @PathVariable Long id,
            @RequestBody Produto produtoAtualizado) {

        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        produtoAtualizado.setId(id);
        Produto salvo = produtoRepository.save(produtoAtualizado);
        return ResponseEntity.ok(salvo);
    }
}