// package com.example.medishop.dto;

// import jakarta.validation.constraints.NotNull;

// public class OrderItemRequest {

//     @NotNull
//     private Long medicineId;

//     @NotNull
//     private Integer quantity;

//     public Long getMedicineId() {
//         return medicineId;
//     }

//     public void setMedicineId(Long medicineId) {
//         this.medicineId = medicineId;
//     }

//     public Integer getQuantity() {
//         return quantity;
//     }

//     public void setQuantity(Integer quantity) {
//         this.quantity = quantity;
//     }
// }





package com.example.medishop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class OrderItemRequest {

    @NotNull(message = "Medicine ID is required")
    private Long medicineId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    // Price is OPTIONAL (backend can calculate it)
    @Positive(message = "Price must be greater than 0")
    private Double price;

    // ✅ Default constructor (REQUIRED for JSON mapping)
    public OrderItemRequest() {
    }

    // ===== GETTERS & SETTERS =====

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
