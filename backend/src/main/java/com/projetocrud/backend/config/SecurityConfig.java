package com.projetocrud.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Configuração CORS (integra com o CorsFilter que você já tem)
                .cors(cors -> cors.configure(http))

                // Desativa CSRF (não necessário para APIs stateless)
                .csrf(csrf -> csrf.disable())

                // Configuração de autorização
                .authorizeHttpRequests(auth -> auth
                        // Libera todas as rotas sem autenticação
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}