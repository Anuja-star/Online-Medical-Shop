package com.example.medishop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.medishop.model.Medicine;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    // ✅ Used while placing order
    Optional<Medicine> findByName(String name);

    // User: show only available medicines
    List<Medicine> findByStockGreaterThan(int stock);

    // Admin: search medicines by name
    List<Medicine> findByNameContainingIgnoreCase(String name);
}
