package com.projetocrud.backendcrud.controller;

import com.projetocrud.backendcrud.dto.LoginDTO;
import com.projetocrud.backendcrud.model.User;
import com.projetocrud.backendcrud.service.UserService;
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
}
