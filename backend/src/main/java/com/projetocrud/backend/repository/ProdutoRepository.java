package com.projetocrud.backend.repository;

import com.projetocrud.backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    // Método 1: Busca por nome (case-insensitive)
    @Query("SELECT p FROM Produto p WHERE LOWER(p.nome) LIKE LOWER(concat('%', :termo,'%'))")
    List<Produto> findByNomeContaining(@Param("termo") String termo);

    // Método 2: Busca por ID ou nome (opcional)
    @Query("SELECT p FROM Produto p WHERE p.id = :id OR LOWER(p.nome) LIKE LOWER(concat('%', :termo,'%'))")
    List<Produto> findByIdOrNomeContaining(@Param("id") Long id, @Param("termo") String termo);
}