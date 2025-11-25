package com.example.medishop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.medishop.dto.OrderRequest;
import com.example.medishop.model.Order;
import com.example.medishop.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    // Place order
    public Order placeOrder(OrderRequest request) {

        Order order = new Order();

        order.setUsername(request.getUsername());
        order.setCustomerName(request.getCustomerName());
        order.setAddress(request.getAddress());
        order.setContact(request.getContact());
        order.setPaymentMethod(request.getPaymentMethod());

        order.setMedicineName(request.getMedicineName());
        order.setQuantity(request.getQuantity());
        order.setTotalPrice(request.getTotalPrice());

        return repo.save(order);
    }

    // For user
    public List<Order> getOrdersForUser(String username) {
        return repo.findByUsername(username);
    }

    // For admin
    public List<Order> getAllOrders() {
        return repo.findAll();
    }
}
