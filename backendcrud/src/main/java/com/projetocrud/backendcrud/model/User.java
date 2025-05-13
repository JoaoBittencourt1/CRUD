package com.projetocrud.backendcrud.model;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @ManyToOne
    @JoinColumn(name = "grupo_id") // nome da coluna no banco que referencia o grupo
    private Grupo grupo;

    // Construtores

    public User() {
    }

    public User(String email, String senha, Grupo grupo) {
        this.email = email;
        this.senha = senha;
        this.grupo = grupo;
    }

    // Getters e setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }
}
