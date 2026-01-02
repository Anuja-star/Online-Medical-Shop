// package com.example.medishop.model;

// import java.time.LocalDateTime;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "orders")
// public class Order {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String username;        // Login username
//     private String customerName;    // Full name
//     private String address;         // Delivery address
//     private String contact;         // Mobile number
//     private String paymentMethod;   // COD/UPI

//     private String medicineName;
//     private int quantity;
//     private double totalPrice;

//     private LocalDateTime orderTime = LocalDateTime.now();

//     public Order() {}

//     // Getters & Setters  
//     public Long getId() { return id; }

//     public String getUsername() { return username; }
//     public void setUsername(String username) { this.username = username; }

//     public String getCustomerName() { return customerName; }
//     public void setCustomerName(String customerName) { this.customerName = customerName; }

//     public String getAddress() { return address; }
//     public void setAddress(String address) { this.address = address; }

//     public String getContact() { return contact; }
//     public void setContact(String contact) { this.contact = contact; }

//     public String getPaymentMethod() { return paymentMethod; }
//     public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

//     public String getMedicineName() { return medicineName; }
//     public void setMedicineName(String medicineName) { this.medicineName = medicineName; }

//     public int getQuantity() { return quantity; }
//     public void setQuantity(int quantity) { this.quantity = quantity; }

//     public double getTotalPrice() { return totalPrice; }
//     public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

//     public LocalDateTime getOrderTime() { return orderTime; }
//     public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }
// }




package com.example.medishop.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== USER DETAILS =====
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String contact;

    // ===== ORDER DETAILS =====
    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private String medicineName;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double totalPrice;

    // ===== ADMIN ORDER STATUS =====
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PLACED;

    @Column(nullable = false)
    private LocalDateTime orderTime;

    // ===== CONSTRUCTOR =====
    public Order() {
        this.orderTime = LocalDateTime.now();
    }

    // ===== GETTERS & SETTERS =====
    public Long getId() {
        return id;
    }

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

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
}

