package com.projetocrud.backendcrud.service;

import com.projetocrud.backendcrud.model.User;
import com.projetocrud.backendcrud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
