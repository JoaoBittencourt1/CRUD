package com.projetocrud.backend.repository;

import com.projetocrud.backend.model.Produto;
import com.projetocrud.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByUsuario(User usuario);
}
