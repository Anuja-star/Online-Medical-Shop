// package com.example.medishop;

// import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Bean;

// import com.example.medishop.model.Medicine;
// import com.example.medishop.repository.MedicineRepository;

// @SpringBootApplication
// public class OnlineMedicalShopApplication {

//     public static void main(String[] args) {
//         SpringApplication.run(OnlineMedicalShopApplication.class, args);
//     }

//     // Seed sample medicine data ONLY if table is empty
//     @Bean
//     public CommandLineRunner initialData(MedicineRepository repository) {
//         return args -> {

//             if (repository.count() == 0) {  // Prevent duplicates
//                 repository.save(new Medicine("Paracetamol 500mg", "Fever and Pain Relief", 2.50, 500));
//                 repository.save(new Medicine("Amoxicillin 250mg", "Antibiotic", 15.00, 100));
//                 repository.save(new Medicine("Ibuprofen 400mg", "Inflammation Relief", 4.00, 300));
//                 repository.save(new Medicine("Vitamin C Chewable", "Immune Support", 25.00, 150));
//                 repository.save(new Medicine("Amlodipine 5mg", "Blood Pressure", 50.00, 75));

//                 System.out.println("✔ Medicine table was empty — Sample data inserted.");
//             } else {
//                 System.out.println("✔ Medicine table already has data — No seeding performed.");
//             }
//         };
//     }
// }
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

            if (repository.count() == 0) {

                Medicine m1 = new Medicine();
                m1.setName("Paracetamol 500mg");
                m1.setDescription("Fever and Pain Relief");
                m1.setPrice(2.50);
                m1.setStock(500);
                m1.setImageUrl("https://via.placeholder.com/150");
                repository.save(m1);

                Medicine m2 = new Medicine();
                m2.setName("Amoxicillin 250mg");
                m2.setDescription("Antibiotic");
                m2.setPrice(15.00);
                m2.setStock(100);
                m2.setImageUrl("https://via.placeholder.com/150");
                repository.save(m2);

                Medicine m3 = new Medicine();
                m3.setName("Ibuprofen 400mg");
                m3.setDescription("Inflammation Relief");
                m3.setPrice(4.00);
                m3.setStock(300);
                m3.setImageUrl("https://via.placeholder.com/150");
                repository.save(m3);

                Medicine m4 = new Medicine();
                m4.setName("Vitamin C Chewable");
                m4.setDescription("Immune Support");
                m4.setPrice(25.00);
                m4.setStock(150);
                m4.setImageUrl("https://via.placeholder.com/150");
                repository.save(m4);

                Medicine m5 = new Medicine();
                m5.setName("Amlodipine 5mg");
                m5.setDescription("Blood Pressure");
                m5.setPrice(50.00);
                m5.setStock(75);
                m5.setImageUrl("https://via.placeholder.com/150");
                repository.save(m5);

                System.out.println("✔ Medicine table was empty — Sample data inserted.");
            } else {
                System.out.println("✔ Medicine table already has data — No seeding performed.");
            }
        };
    }
}
