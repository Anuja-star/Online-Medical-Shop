package com.example.medishop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.medishop.model.User;
import com.example.medishop.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;

        // Seed an admin user if not present
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User("admin", "admin@gmail.com", "adminpass");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("✔ Admin user created: admin/adminpass");
        }
    }

    // -------------------- USER REGISTRATION --------------------
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User request) {

        if (request.getUsername() == null || request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("❌ All fields are required!");
        }

        // Check duplicate username
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("❌ Username already exists!");
        }

        // Check duplicate email
        if (userRepository.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("❌ Email already exists!");
        }

        // Create new user
        User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
        newUser.setRole("USER");

        userRepository.save(newUser);

        return ResponseEntity.ok("✅ User registered successfully!");
    }

    // -------------------- USER LOGIN --------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {

        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("❌ Invalid username!");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("❌ Invalid password!");
        }

        // Return role so frontend knows if it's USER or ADMIN
        return ResponseEntity.ok(user.getRole());
    }

    // -------------------- ADMIN: GET ALL USERS --------------------
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

