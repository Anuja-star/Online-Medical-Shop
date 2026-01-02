// package com.example.medishop.repository;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.example.medishop.model.Medicine;

// /**
//  * Repository interface for Medicine entity.
//  * Extends JpaRepository to provide standard database access methods (CRUD).
//  */
// public interface MedicineRepository extends JpaRepository<Medicine, Long> {
//     // Spring Data JPA automatically provides methods like findAll, save, deleteById, etc.
// }


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
