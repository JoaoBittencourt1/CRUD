package com.projetocrud.backend.dto;

/**
 * DTO para cadastro de produtos.
 * - usuarioId é opcional (pode ser null)
 */
public record ProdutoRequest(
        String nome,
        String codigoProduto,
        String fabricante,
        String tipo,
        int quantidade,
        double preco,
        Long usuarioId  // Pode ser null
) {}