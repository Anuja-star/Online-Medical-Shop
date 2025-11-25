package com.example.medishop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.medishop.dto.OrderRequest;
import com.example.medishop.model.Order;
import com.example.medishop.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // Place Order
    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {
        return service.placeOrder(request);
    }

    // Get orders of logged-in user
    @GetMapping("/{username}")
    public List<Order> getOrdersOfUser(@PathVariable String username) {
        return service.getOrdersForUser(username);
    }

    // Admin: Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }
}
