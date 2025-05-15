package com.projetocrud.backendcrud.controller;

import com.projetocrud.backendcrud.dto.ProdutoDTO;
import com.projetocrud.backendcrud.model.Produto;
import com.projetocrud.backendcrud.model.User;
import com.projetocrud.backendcrud.repository.UserRepository;
import com.projetocrud.backendcrud.service.JwtService;
import com.projetocrud.backendcrud.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarProduto(@RequestBody ProdutoDTO produtoDTO,
                                              @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token não fornecido ou inválido");
        }

        String token = authHeader.replace("Bearer ", "");
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }

        Long usuarioId = Long.valueOf(jwtService.getUserIdFromToken(token));
        User usuario = userRepository.findById(usuarioId).orElse(null);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setFabricante(produtoDTO.getFabricante());
        produto.setTipo(produtoDTO.getTipo());
        produto.setQuantidade(produtoDTO.getQuantidade());
        produto.setPreco(produtoDTO.getPreco());
        produto.setUsuario(usuario);

        try {
            produtoService.save(produto);
            return ResponseEntity.status(HttpStatus.CREATED).body(produto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar produto: " + e.getMessage());
        }
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Map<String, String>> excluirProduto(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization") String authHeader) {

        // Validação do token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.singletonMap("error", "Token não fornecido ou inválido"));
        }

        String token = authHeader.substring(7); // Remove "Bearer "

        // Validação do token JWT
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.singletonMap("error", "Token inválido ou expirado"));
        }

        // Obtenção do usuário
        Long usuarioId = Long.valueOf(jwtService.getUserIdFromToken(token));
        User usuario = userRepository.findById(usuarioId).orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.singletonMap("error", "Usuário não encontrado"));
        }

        // Verificação da existência do produto
        Optional<Produto> optionalProduto = produtoService.findById(id);
        if (optionalProduto.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.singletonMap("error", "Produto não encontrado"));
        }

        Produto produto = optionalProduto.get();

        // Verificação de propriedade do produto
        if (!produto.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.singletonMap("error", "Você não tem permissão para excluir este produto"));
        }

        // Exclusão do produto
        try {
            produtoService.delete(id);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.singletonMap("message", "Produto excluído com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Collections.singletonMap("error", "Erro ao excluir produto: " + e.getMessage()));
        }
    }
}
