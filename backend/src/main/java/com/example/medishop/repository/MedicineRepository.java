package com.example.medishop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.medishop.model.Medicine;

/**
 * Repository interface for Medicine entity.
 * Extends JpaRepository to provide standard database access methods (CRUD).
 */
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    // Spring Data JPA automatically provides methods like findAll, save, deleteById, etc.
}