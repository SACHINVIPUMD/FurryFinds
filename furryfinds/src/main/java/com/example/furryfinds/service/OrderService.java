package com.example.furryfinds.service;

import com.example.furryfinds.entity.Order;
import com.example.furryfinds.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(updatedOrder.getStatus());
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}
