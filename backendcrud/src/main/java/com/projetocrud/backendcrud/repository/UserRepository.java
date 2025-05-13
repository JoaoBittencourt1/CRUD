package com.projetocrud.backendcrud.repository;

import com.projetocrud.backendcrud.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
