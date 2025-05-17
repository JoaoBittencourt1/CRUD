package com.projetocrud.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "produtos") // Recomendado usar nome no plural (convenção SQL)
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String codigoProduto;

    @Column(nullable = false)
    private String fabricante;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private int quantidade;

    @Column(nullable = false)
    private double preco;

    @ManyToOne(fetch = FetchType.LAZY, optional = true) // Usuário é opcional
    @JoinColumn(name = "usuario_id", nullable = true)   // Aceita NULL no banco
    private User usuario;

    // Construtor padrão (obrigatório para JPA)
    public Produto() {
    }

    // Construtor com todos os campos
    public Produto(String nome, String codigoProduto, String fabricante,
                   String tipo, int quantidade, double preco, User usuario) {
        this.nome = nome;
        this.codigoProduto = codigoProduto;
        this.fabricante = fabricante;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.preco = preco;
        this.usuario = usuario; // Pode ser NULL
    }

    // --- Getters e Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCodigoProduto() {
        return codigoProduto;
    }

    public void setCodigoProduto(String codigoProduto) {
        this.codigoProduto = codigoProduto;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }
}