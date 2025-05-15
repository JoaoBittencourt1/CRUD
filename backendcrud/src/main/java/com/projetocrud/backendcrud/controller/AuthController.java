package com.projetocrud.backendcrud.controller;

import com.projetocrud.backendcrud.dto.LoginDTO;

import com.projetocrud.backendcrud.dto.RecuperarSenhaDTO;
import com.projetocrud.backendcrud.dto.RegisterDTO;

import com.projetocrud.backendcrud.model.User;
import com.projetocrud.backendcrud.repository.UserRepository;
import com.projetocrud.backendcrud.service.JwtService;

import com.projetocrud.backendcrud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController{

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtService jwtService;





    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.findByEmail(loginDTO.getEmail());

        if (user != null && user.getSenha().equals(loginDTO.getSenha())) {

            String token = jwtService.generateToken(Math.toIntExact(user.getId()));
            return ResponseEntity.ok().body(Map.of(
                    "message", "Login bem-sucedido",
                    "token", token,
                    "usuarioId", user.getId(),
                    "nome", user.getNome()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "error", "Email ou senha inválidos"
            ));
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

    @GetMapping("/usuarios")
    public ResponseEntity<List<User>> listarUsuarios() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(@RequestBody RecuperarSenhaDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        user.setSenha(dto.getNovaSenha()); // Se quiser, aplique hash aqui
        userRepository.save(user);
        return ResponseEntity.ok("Senha atualizada com sucesso");
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        if (jwtService.validateToken(token)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
