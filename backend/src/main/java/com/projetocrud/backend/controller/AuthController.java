package com.projetocrud.backend.controller;

import com.projetocrud.backend.dto.LoginDTO;
import com.projetocrud.backend.dto.RegisterDTO;
import com.projetocrud.backend.model.User;
import com.projetocrud.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.findByEmail(loginDTO.getEmail());

        if (user != null && user.getSenha().equals(loginDTO.getSenha())) {
            return ResponseEntity.ok().body("{\"message\": \"Login bem-sucedido\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Email ou senha inválidos\"}");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
        // Validar se o email já existe
        if (userService.findByEmail(registerDTO.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"error\": \"Email já cadastrado\"}");
        }

        // Criar o User
        User user = new User();
        user.setNome(registerDTO.getNome());
        user.setEmail(registerDTO.getEmail());
        user.setSenha(registerDTO.getSenha());

        userService.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"Usuário criado com sucesso\"}");
    }
}