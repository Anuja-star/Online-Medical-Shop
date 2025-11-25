package com.example.medishop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.medishop.model.Order;
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUsername(String username);
}
