// package com.example.medishop.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.example.medishop.dto.OrderRequest;
// import com.example.medishop.model.Order;
// import com.example.medishop.repository.OrderRepository;

// @Service
// public class OrderService {

//     private final OrderRepository repo;

//     public OrderService(OrderRepository repo) {
//         this.repo = repo;
//     }

//     // Place order
//     public Order placeOrder(OrderRequest request) {

//         Order order = new Order();

//         order.setUsername(request.getUsername());
//         order.setCustomerName(request.getCustomerName());
//         order.setAddress(request.getAddress());
//         order.setContact(request.getContact());
//         order.setPaymentMethod(request.getPaymentMethod());

//         order.setMedicineName(request.getMedicineName());
//         order.setQuantity(request.getQuantity());
//         order.setTotalPrice(request.getTotalPrice());

//         return repo.save(order);
//     }

//     // For user
//     public List<Order> getOrdersForUser(String username) {
//         return repo.findByUsername(username);
//     }

//     // For admin
//     public List<Order> getAllOrders() {
//         return repo.findAll();
//     }
// }


// package com.example.medishop.service;

// import java.time.LocalDateTime;
// import java.util.Collections;
// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.example.medishop.dto.OrderRequest;
// import com.example.medishop.model.Order;
// import com.example.medishop.model.OrderStatus;
// import com.example.medishop.repository.OrderRepository;

// @Service
// public class OrderService {

//     private final OrderRepository orderRepo;

//     public OrderService(OrderRepository orderRepo) {
//         this.orderRepo = orderRepo;
//     }

//     // ---------------- PLACE ORDER ----------------
//     public Order placeOrder(OrderRequest request) {

//         if (request == null) {
//             throw new IllegalArgumentException("Order request cannot be null");
//         }

//         Order order = new Order();

//         order.setUsername(request.getUsername());
//         order.setCustomerName(request.getCustomer_name());
//         order.setAddress(request.getAddress());
//         order.setContact(request.getContact());
//         order.setPaymentMethod(request.getPayment_method());

//         order.setMedicineName(request.getMedicine_name());
//         order.setQuantity(request.getQuantity());
//         order.setTotalPrice(request.getTotal_Price());

//         order.setStatus(OrderStatus.PLACED); // default
//         order.setOrderTime(LocalDateTime.now());

//         return orderRepo.save(order);
//     }

//     // ---------------- USER ORDERS ----------------
//     public List<Order> getOrdersForUser(String username) {
//         if (username == null || username.trim().isEmpty()) {
//             return Collections.emptyList();
//         }
//         return orderRepo.findByUsername(username);
//     }

//     // ---------------- ADMIN ORDERS ----------------
//     public List<Order> getAllOrders() {
//         return orderRepo.findAll();
//     }

//     // ---------------- ADMIN STATUS UPDATE ----------------
//     public Order updateOrderStatus(Long orderId, OrderStatus status) {

//         Order order = orderRepo.findById(orderId)
//                 .orElseThrow(() -> new RuntimeException("Order not found"));

//         order.setStatus(status);
//         return orderRepo.save(order);
//     }
// }


package com.example.medishop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.medishop.dto.OrderItemRequest;
import com.example.medishop.dto.OrderRequest;
import com.example.medishop.model.Medicine;
import com.example.medishop.model.Order;
import com.example.medishop.model.OrderStatus;
import com.example.medishop.repository.MedicineRepository;
import com.example.medishop.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final MedicineRepository medicineRepo;

    public OrderService(OrderRepository orderRepo, MedicineRepository medicineRepo) {
        this.orderRepo = orderRepo;
        this.medicineRepo = medicineRepo;
    }

    @Transactional
    public Order placeOrder(OrderRequest request) {

        double totalPrice = 0;
        StringBuilder medicineNames = new StringBuilder();

        // 🔁 Process each order item
        for (OrderItemRequest item : request.getItems()) {

            // ✅ Find medicine by ID (CORRECT)
            Medicine medicine = medicineRepo.findById(item.getMedicineId())
                    .orElseThrow(() ->
                        new RuntimeException("Medicine not found with ID: " + item.getMedicineId())
                    );

            // ✅ Stock check
            if (medicine.getStock() < item.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for: " + medicine.getName()
                );
            }

            // ✅ Reduce stock
            medicine.setStock(medicine.getStock() - item.getQuantity());
            medicineRepo.save(medicine);

            // ✅ Calculate total price (SECURE – from DB)
            totalPrice += medicine.getPrice() * item.getQuantity();

            // ✅ Collect medicine names (optional display purpose)
            medicineNames.append(medicine.getName())
                         .append(" x ")
                         .append(item.getQuantity())
                         .append(", ");
        }

        // 🧾 Create order
        Order order = new Order();
        order.setUsername(request.getUsername());
        order.setCustomerName(request.getCustomerName());
        order.setAddress(request.getAddress());
        order.setContact(request.getContact());
        order.setPaymentMethod(request.getPaymentMethod());

        order.setMedicineName(medicineNames.toString());
        order.setTotalPrice(totalPrice);

        order.setStatus(OrderStatus.PLACED);
        order.setOrderTime(LocalDateTime.now());

        return orderRepo.save(order);
    }

    // ===============================
    // OTHER METHODS
    // ===============================

    public List<Order> getOrdersOfUser(String username) {
        return orderRepo.findByUsername(username);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepo.save(order);
    }
}
