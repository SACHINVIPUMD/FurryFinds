package com.example.furryfinds.service;

import com.example.furryfinds.entity.OrderItem;
import com.example.furryfinds.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository OrderItemRepository;

    public List<OrderItem> getOrderItemsByUserId(Long userId) {
        return OrderItemRepository.findByUserId(userId);
    }
    public List<OrderItem> findAllOrders() {
        return OrderItemRepository.findAll();
    }
    public OrderItem addOrderItem(OrderItem OrderItem) {
        return OrderItemRepository.save(OrderItem);
    }

    public void removeOrderItem(Long OrderItemId) {
        OrderItemRepository.deleteById(OrderItemId);
    }

    public void clearOrder(Long userId) {
        List<OrderItem> OrderItems = OrderItemRepository.findByUserId(userId);
        OrderItemRepository.deleteAll(OrderItems);
    }
    public OrderItem updateOrderItemStatus(Long orderItemId, String status) {
        OrderItem orderItem = OrderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id " + orderItemId));
        orderItem.setStatus(status);
        return OrderItemRepository.save(orderItem);
    }
}
