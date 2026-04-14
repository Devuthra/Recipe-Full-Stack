package com.example.recipe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.recipe.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}