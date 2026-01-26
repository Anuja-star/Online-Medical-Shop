// package com.example.medishop.dto;

// import jakarta.validation.constraints.Min;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Positive;

// public class OrderRequest {

//     // ❌ Do NOT validate ID on request (DB auto-generates it)
//     private Long id;

//     @NotBlank(message = "Username is required")
//     private String username;

//     @NotBlank(message = "Customer name is required")
//     private String customer_name;

//     @NotBlank(message = "Address is required")
//     private String address;

//     @NotBlank(message = "Contact is required")
//     private String contact;

//     @NotBlank(message = "Medicine name is required")
//     private String medicine_name;

//     @Min(value = 1, message = "Quantity must be at least 1")
//     private int quantity;

//     @Positive(message = "Total price must be positive")
//     private double total_price;

//     @NotBlank(message = "Payment method is required")
//     private String payment_method;

//     // Admin controls this → not user
//     private String status;

//     // ================= GETTERS & SETTERS =================

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getUsername() {
//         return username;
//     }

//     public void setUsername(String username) {
//         this.username = username;
//     }

//     public String getCustomer_name() {
//         return customer_name;
//     }

//     public void setCustomer_name(String customer_name) {
//         this.customer_name = customer_name;
//     }

//     public String getAddress() {
//         return address;
//     }

//     public void setAddress(String address) {
//         this.address = address;
//     }

//     public String getContact() {
//         return contact;
//     }

//     public void setContact(String contact) {
//         this.contact = contact;
//     }

//     public String getMedicine_name() {
//         return medicine_name;
//     }

//     public void setMedicine_name(String medicine_name) {
//         this.medicine_name = medicine_name;
//     }

//     public int getQuantity() {
//         return quantity;
//     }

//     public void setQuantity(int quantity) {
//         this.quantity = quantity;
//     }

//     public double getTotal_price() {
//         return total_price;
//     }

//     public void setTotal_price(double total_price) {
//         this.total_price = total_price;
//     }

//     public String getPayment_method() {
//         return payment_method;
//     }

//     public void setPayment_method(String payment_method) {
//         this.payment_method = payment_method;
//     }

//     public String getStatus() {
//         return status;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }
// }


package com.example.medishop.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public class OrderRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Contact is required")
    private String contact;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    @NotEmpty(message = "Order items cannot be empty")
    @Valid
    private List<OrderItemRequest> items;

    // ✅ DEFAULT CONSTRUCTOR (IMPORTANT)
    public OrderRequest() {
    }

    // ===== GETTERS & SETTERS =====

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}


