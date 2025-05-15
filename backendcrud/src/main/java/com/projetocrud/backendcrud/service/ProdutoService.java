package com.projetocrud.backendcrud.service;

import com.projetocrud.backendcrud.model.Produto;
import com.projetocrud.backendcrud.model.User;
import com.projetocrud.backendcrud.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Produto save(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Optional<Produto> findById(Long id) {
        return produtoRepository.findById(id);
    }

    public void delete(Long id) {
        produtoRepository.deleteById(id);
    }

    public List<Produto> findByUsuario(User usuario) {
        return produtoRepository.findByUsuario(usuario);
    }
}