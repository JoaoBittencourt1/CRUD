package com.projetocrud.backendcrud.repository;

import com.projetocrud.backendcrud.model.Produto;
import com.projetocrud.backendcrud.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByUsuario(User usuario);
}