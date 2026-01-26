package com.example.medishop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.medishop.model.User;
import com.example.medishop.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
    origins = "http://localhost:3000", // ❗ NOT "*"
    allowCredentials = "true"
)
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // -------------------- ADMIN SEED --------------------
    @PostConstruct
    public void createAdminIfNotExists() {
        if (userRepository.findByUsername("admin").isEmpty()) {

            User admin = new User("admin", "admin@gmail.com", "adminpass");
            admin.setRole("ADMIN");

            User anuja = new User("anuja", "anuja@gmail.com", "anujapass");
            anuja.setRole("ADMIN");

            userRepository.save(admin);
            userRepository.save(anuja);

            System.out.println("✔ Admin users created");
        }
    }

    // -------------------- USER REGISTRATION --------------------
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User request) {

        if (request.getUsername() == null ||
            request.getEmail() == null ||
            request.getPassword() == null) {

            return ResponseEntity.badRequest().body("❌ All fields are required!");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("❌ Username already exists!");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("❌ Email already exists!");
        }

        User newUser = new User(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
        );
        newUser.setRole("USER");

        userRepository.save(newUser);

        return ResponseEntity.ok("✅ User registered successfully!");
    }

    // -------------------- USER LOGIN (SESSION BASED) --------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User request,
            HttpSession session) {

        Optional<User> userOpt =
                userRepository.findByUsername(request.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("❌ Invalid username!");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("❌ Invalid password!");
        }

        // 🔥 STORE LOGGED-IN USER IN SESSION
        session.setAttribute("LOGGED_USER", user);

        // Optional: return minimal info
        return ResponseEntity.ok(user.getRole());
    }

    // -------------------- LOGOUT --------------------
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("✅ Logged out successfully");
    }

    // -------------------- ADMIN: GET ALL USERS --------------------
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
