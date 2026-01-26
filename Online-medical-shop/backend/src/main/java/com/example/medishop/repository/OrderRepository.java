// package com.example.medishop.repository;

// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.example.medishop.model.Order;
// public interface OrderRepository extends JpaRepository<Order, Long> {
//     List<Order> findByUsername(String username);
// }



package com.example.medishop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.medishop.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // ✅ Get all orders of a specific user
    List<Order> findByUsername(String username);
}

