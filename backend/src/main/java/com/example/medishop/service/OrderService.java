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

    private final OrderRepository orderRepository;
    private final MedicineRepository medicineRepository;

    public OrderService(OrderRepository orderRepository,
                        MedicineRepository medicineRepository) {
        this.orderRepository = orderRepository;
        this.medicineRepository = medicineRepository;
    }

    // ===============================
    // PLACE ORDER
    // ===============================
    @Transactional
    public Order placeOrder(OrderRequest request) {

        double totalPrice = 0.0;
        int totalQuantity = 0;
        StringBuilder medicineNames = new StringBuilder();

        // 🔁 Process order items
        for (OrderItemRequest item : request.getItems()) {

            Medicine medicine = medicineRepository.findById(item.getMedicineId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Medicine not found with ID: " + item.getMedicineId()
                            )
                    );

            // ✅ Stock validation
            if (medicine.getStock() < item.getQuantity()) {
                throw new RuntimeException(
                        "Insufficient stock for medicine: " + medicine.getName()
                );
            }

            // ✅ Reduce stock
            medicine.setStock(medicine.getStock() - item.getQuantity());
            medicineRepository.save(medicine);

            // ✅ Calculate totals
            totalPrice += medicine.getPrice() * item.getQuantity();
            totalQuantity += item.getQuantity();

            // ✅ Collect medicine names for display
            medicineNames.append(medicine.getName())
                         .append(" x ")
                         .append(item.getQuantity())
                         .append(", ");
        }

        // 🔧 Remove trailing comma
        if (medicineNames.length() > 0) {
            medicineNames.setLength(medicineNames.length() - 2);
        }

        // 🧾 Create Order
        Order order = new Order();
        order.setUsername(request.getUsername());
        order.setCustomerName(request.getCustomerName());
        order.setAddress(request.getAddress());
        order.setContact(request.getContact());
        order.setPaymentMethod(request.getPaymentMethod());

        // ✅ IMPORTANT FIELDS FOR UI
        order.setMedicineName(medicineNames.toString());
        order.setQuantity(totalQuantity);
        order.setTotalPrice(totalPrice);

        order.setStatus(OrderStatus.PLACED);
        order.setOrderTime(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // ===============================
    // FETCH USER ORDERS
    // ===============================
    public List<Order> getOrdersOfUser(String username) {
        return orderRepository.findByUsername(username);
    }

    // ===============================
    // FETCH ALL ORDERS (ADMIN)
    // ===============================
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ===============================
    // UPDATE ORDER STATUS
    // ===============================
    public Order updateStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found with ID: " + orderId)
                );

        order.setStatus(status);
        return orderRepository.save(order);
    }
}
