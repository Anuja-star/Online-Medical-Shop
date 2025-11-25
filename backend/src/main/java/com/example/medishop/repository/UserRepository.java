package com.example.medishop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.medishop.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find by username (returns Optional)
    Optional<User> findByUsername(String username);

    // Find by email (returns User or null)
    User findByEmail(String email);
}
