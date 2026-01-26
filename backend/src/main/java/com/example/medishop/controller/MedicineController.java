package com.example.medishop.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

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

    // ================= USER APIs =================

    @GetMapping("/user/medicines")
    public List<Medicine> getMedicinesForUser() {
        return medicineRepository.findAll()
                .stream()
                .filter(m -> m.getStock() > 0)
                .toList();
    }

    @PutMapping("/user/buy/{id}")
    public ResponseEntity<String> buyMedicine(
            @PathVariable Long id,
            @RequestParam int quantity) {

        return medicineRepository.findById(id)
                .map(medicine -> {
                    if (medicine.getStock() < quantity) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body("❌ Not enough stock available");
                    }
                    medicine.setStock(medicine.getStock() - quantity);
                    medicineRepository.save(medicine);
                    return ResponseEntity.ok("✅ Purchase successful");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ================= ADMIN APIs =================

    @GetMapping("/admin/medicines")
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // ADD medicine
    @PostMapping(value = "/admin/medicines", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Medicine addMedicine(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("stock") int stock,
            @RequestParam("file") MultipartFile file) throws IOException {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get("uploads/medicines");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(file.getInputStream(),
                uploadPath.resolve(fileName),
                StandardCopyOption.REPLACE_EXISTING);

        Medicine medicine = new Medicine();
        medicine.setName(name);
        medicine.setDescription(description);
        medicine.setPrice(price);
        medicine.setStock(stock);
        medicine.setImageUrl(fileName);

        return medicineRepository.save(medicine);
    }

    // ✅ UPDATE medicine (THIS FIXES YOUR ERROR)
    @PutMapping("/admin/medicines/{id}")
    public ResponseEntity<Medicine> updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine) {

        Medicine existing = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        existing.setName(medicine.getName());
        existing.setDescription(medicine.getDescription());
        existing.setPrice(medicine.getPrice());
        existing.setStock(medicine.getStock());
        existing.setImageUrl(medicine.getImageUrl());

        Medicine updated = medicineRepository.save(existing);
        return ResponseEntity.ok(updated);
    }

    // DELETE medicine
    @DeleteMapping("/admin/medicines/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        if (!medicineRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        medicineRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ================= IMAGE VIEWING =================

    @GetMapping("/image/{fileName}")
    public ResponseEntity<Resource> getMedicineImage(@PathVariable String fileName) {
        Path path = Paths.get("uploads/medicines").resolve(fileName);
        Resource resource = new FileSystemResource(path);

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}
