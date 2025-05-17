package com.projetocrud.backend.controller;


import com.projetocrud.backend.dto.LoginDTO;
import com.projetocrud.backend.dto.RecuperarSenhaRequest;
import com.projetocrud.backend.dto.RegisterDTO;
import com.projetocrud.backend.model.User;
import com.projetocrud.backend.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.findByEmail(loginDTO.getEmail());

        if (user != null && user.getSenha().equals(loginDTO.getSenha())) {
            return ResponseEntity.ok().body("{\"id\": \"" + user.getId() + "\", \"message\": \"Login bem-sucedido\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Email ou senha inválidos\"}");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
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

    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(
            @RequestBody RecuperarSenhaRequest request) {

        User usuario = userRepository.findByEmail(request.getEmail());
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("E-mail não cadastrado");
        }

        usuario.setSenha(request.getNovaSenha());
        userRepository.save(usuario);

        return ResponseEntity.ok().body("Senha atualizada com sucesso");
    }
}