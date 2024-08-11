package com.example.furryfinds.repository;

import com.example.furryfinds.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Fetch orders by user ID
    List<Order> findByUserId(Long userId);

    // Fetch orders by status
    List<Order> findByStatus(Order.OrderStatus status);
}
