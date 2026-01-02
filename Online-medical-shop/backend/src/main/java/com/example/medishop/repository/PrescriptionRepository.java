package com.example.medishop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.medishop.model.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
}

