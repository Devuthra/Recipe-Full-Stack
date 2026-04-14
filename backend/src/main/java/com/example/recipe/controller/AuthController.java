package com.example.recipe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.recipe.JwtUtil;
import com.example.recipe.model.User;
import com.example.recipe.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repo.save(user);
    }

    // LOGIN
    @PostMapping("/login")
public String login(@RequestBody User user) {
    try {
        System.out.println("LOGIN REQUEST: " + user.getUsername());

        User existing = repo.findByUsername(user.getUsername());

        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return jwtUtil.generateToken(existing.getUsername());
        }

        return "Invalid credentials";

    } catch (Exception e) {
        e.printStackTrace(); // 
        return "Error occurred";
    }
}
}