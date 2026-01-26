package com.example.medishop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.medishop.dto.OrderRequest;
import com.example.medishop.model.Order;
import com.example.medishop.model.OrderStatus;
import com.example.medishop.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // ✅ PLACE ORDER (USER)
    @PostMapping
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequest request) {
        Order order = service.placeOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    // ✅ GET ORDERS OF A USER
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Order>> getOrdersOfUser(@PathVariable String username) {
        return ResponseEntity.ok(service.getOrdersOfUser(username));
    }

    // ✅ GET ALL ORDERS (ADMIN)
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(service.getAllOrders());
    }

    // ✅ UPDATE ORDER STATUS (ADMIN)
    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @PathVariable OrderStatus status) {

        Order updatedOrder = service.updateStatus(id, status);
        return ResponseEntity.ok(updatedOrder);
    }
}

