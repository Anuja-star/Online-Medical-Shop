package com.example.medishop;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.medishop.model.Medicine;
import com.example.medishop.repository.MedicineRepository;

@SpringBootApplication
public class OnlineMedicalShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineMedicalShopApplication.class, args);
    }

    // Seed sample medicine data ONLY if table is empty
    @Bean
    public CommandLineRunner initialData(MedicineRepository repository) {
        return args -> {

            if (repository.count() == 0) {  // Prevent duplicates
                repository.save(new Medicine("Paracetamol 500mg", "Fever and Pain Relief", 2.50, 500));
                repository.save(new Medicine("Amoxicillin 250mg", "Antibiotic", 15.00, 100));
                repository.save(new Medicine("Ibuprofen 400mg", "Inflammation Relief", 4.00, 300));
                repository.save(new Medicine("Vitamin C Chewable", "Immune Support", 25.00, 150));
                repository.save(new Medicine("Amlodipine 5mg", "Blood Pressure", 50.00, 75));

                System.out.println("✔ Medicine table was empty — Sample data inserted.");
            } else {
                System.out.println("✔ Medicine table already has data — No seeding performed.");
            }
        };
    }
}
