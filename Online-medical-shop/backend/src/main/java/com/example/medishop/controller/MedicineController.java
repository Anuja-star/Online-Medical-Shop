// package com.example.medishop.controller;

// import java.util.List;
// import java.util.stream.Collectors;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.medishop.model.Medicine;
// import com.example.medishop.repository.MedicineRepository;

// @RestController
// @RequestMapping("/api")
// @CrossOrigin(origins = "http://localhost:3000")
// public class MedicineController {

//     private final MedicineRepository medicineRepository;

//     public MedicineController(MedicineRepository medicineRepository) {
//         this.medicineRepository = medicineRepository;
//     }

//     // ===========================
//     // USER — Only in-stock items
//     // ===========================
//     @GetMapping("/user/medicines")
//     public List<Medicine> getAvailableMedicinesForUser() {
//         return medicineRepository.findAll().stream()
//                 .filter(m -> m.getStock() > 0)
//                 .collect(Collectors.toList());
//     }

//     // ===========================
//     // ADMIN — Full CRUD
//     // ===========================

//     // Get all medicines
//     @GetMapping("/medicines")
//     public List<Medicine> getAllMedicines() {
//         return medicineRepository.findAll();
//     }

//     // Add a new medicine
//     @PostMapping("/medicines")
//     public Medicine createMedicine(@RequestBody Medicine medicine) {
//         return medicineRepository.save(medicine);
//     }

//     // Update medicine
//     @PutMapping("/medicines/{id}")
//     public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id, @RequestBody Medicine updated) {
//         return medicineRepository.findById(id)
//                 .map(existing -> {
//                     existing.setName(updated.getName());
//                     existing.setDescription(updated.getDescription());
//                     existing.setPrice(updated.getPrice());
//                     existing.setStock(updated.getStock());
//                     return ResponseEntity.ok(medicineRepository.save(existing));
//                 })
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     // Delete medicine
//     @DeleteMapping("/medicines/{id}")
//     public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
//         if (!medicineRepository.existsById(id)) {
//             return ResponseEntity.notFound().build();
//         }
//         medicineRepository.deleteById(id);
//         return ResponseEntity.noContent().build();
//     }
// }



package com.example.medishop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.medishop.model.Medicine;
import com.example.medishop.repository.MedicineRepository;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicineController {

    private final MedicineRepository medicineRepository;

    public MedicineController(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    // ===========================
    // USER APIs
    // ===========================

    // 1️⃣ User sees only available medicines
    @GetMapping("/user/medicines")
    public List<Medicine> getMedicinesForUser() {
        return medicineRepository.findAll()
                .stream()
                .filter(m -> m.getStock() > 0)
                .toList();
    }

    // 2️⃣ User buys medicine → stock decreases
    @PutMapping("/user/buy/{id}")
    public ResponseEntity<String> buyMedicine(
            @PathVariable Long id,
            @RequestParam int quantity) {

        return medicineRepository.findById(id)
                .map(medicine -> {

                    if (medicine.getStock() < quantity) {
                        return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body("❌ Not enough stock available");
                    }

                    medicine.setStock(medicine.getStock() - quantity);
                    medicineRepository.save(medicine);

                    return ResponseEntity.ok("✅ Purchase successful");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ===========================
    // ADMIN APIs
    // ===========================

    // 3️⃣ Admin sees all medicines
    @GetMapping("/admin/medicines")
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // 4️⃣ Admin adds medicine (with image URL)
    @PostMapping("/admin/medicines")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    // 5️⃣ Admin updates medicine
    @PutMapping("/admin/medicines/{id}")
    public ResponseEntity<Medicine> updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine updated) {

        return medicineRepository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setDescription(updated.getDescription());
                    existing.setPrice(updated.getPrice());
                    existing.setStock(updated.getStock());
                    existing.setImageUrl(updated.getImageUrl());
                    return ResponseEntity.ok(medicineRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 6️⃣ Admin deletes medicine
    @DeleteMapping("/admin/medicines/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        if (!medicineRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        medicineRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
