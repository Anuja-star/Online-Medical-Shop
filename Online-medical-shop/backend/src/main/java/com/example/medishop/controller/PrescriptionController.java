// package com.example.medishop.controller;

// import java.util.List;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.medishop.model.Prescription;
// import com.example.medishop.model.User;
// import com.example.medishop.repository.PrescriptionRepository;
// import com.example.medishop.repository.UserRepository;

// @RestController
// @RequestMapping("/api/prescriptions")
// @CrossOrigin(origins = "http://localhost:3000")
// public class PrescriptionController {

//     private final PrescriptionRepository prescriptionRepository;
//     private final UserRepository userRepository;

//     public PrescriptionController(PrescriptionRepository prescriptionRepository,
//                                   UserRepository userRepository) {
//         this.prescriptionRepository = prescriptionRepository;
//         this.userRepository = userRepository;
//     }

//     // ================= USER =================

//     @PostMapping("/upload/{userId}")
//     public Prescription uploadPrescription(
//             @PathVariable Long userId,
//             @RequestBody Prescription prescription
//     ) {
//         User user = userRepository.findById(userId)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         prescription.setUser(user);
//         prescription.setStatus("PENDING");

//         return prescriptionRepository.save(prescription);
//     }

//     // ================= ADMIN =================

//     @GetMapping("/admin")
//     public List<Prescription> getAllPrescriptions() {
//         return prescriptionRepository.findAll();
//     }

//     @PutMapping("/admin/{id}")
//     public Prescription updatePrescriptionStatus(
//             @PathVariable Long id,
//             @RequestParam String status
//     ) {
//         Prescription prescription = prescriptionRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Prescription not found"));

//         prescription.setStatus(status);
//         return prescriptionRepository.save(prescription);
//     }
// }





package com.example.medishop.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.medishop.model.Prescription;
import com.example.medishop.model.User;
import com.example.medishop.repository.PrescriptionRepository;
import com.example.medishop.repository.UserRepository;
@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;

    public PrescriptionController(PrescriptionRepository prescriptionRepository,
                                  UserRepository userRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
    }

    // ================= USER =================

    @PostMapping(
        value = "/upload/{userId}",
        consumes = "multipart/form-data"
    )
    public Prescription uploadPrescription(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("address") String address,
            @RequestParam("phone") String phone
    ) throws IOException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Safe filename
        String fileName = System.currentTimeMillis() + "_" +
                file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.]", "");

        Path uploadPath = Paths.get("uploads/prescriptions");
        Files.createDirectories(uploadPath);

        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());

        Prescription prescription = new Prescription();
        prescription.setImageUrl(fileName);
        prescription.setAddress(address);
        prescription.setPhone(phone);
        prescription.setStatus("PENDING");
        prescription.setUser(user);

        return prescriptionRepository.save(prescription);
    }

    // ================= ADMIN =================

    @GetMapping("/admin")
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    @PutMapping("/{id}/status")
    public Prescription updatePrescriptionStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        prescription.setStatus(status);
        return prescriptionRepository.save(prescription);
    }

    // ================= IMAGE VIEW =================

    @GetMapping("/image/{fileName}")
    public ResponseEntity<Resource> viewPrescriptionImage(
            @PathVariable String fileName
    ) {
        Path path = Paths.get("uploads/prescriptions").resolve(fileName);
        Resource resource = new FileSystemResource(path);

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/*")
                .body(resource);
    }
}
