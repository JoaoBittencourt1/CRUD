package com.projetocrud.backend.dto;

public record ProdutoRequest(
        String nome,
        String codigoProduto,
        String fabricante,
        String tipo,
        int quantidade,
        double preco,
        Long usuarioId
) {}
