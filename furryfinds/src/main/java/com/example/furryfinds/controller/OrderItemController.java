    package com.example.furryfinds.controller;

    import com.example.furryfinds.entity.OrderItem;
    import com.example.furryfinds.entity.User;
    import com.example.furryfinds.repository.UserRepository;
    import com.example.furryfinds.service.OrderItemService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;

    import java.util.List;

    @RestController
    @RequestMapping("/api/orders")
    public class OrderItemController {

        private static final Logger logger = LoggerFactory.getLogger(OrderItemController.class);

        @Autowired
        private OrderItemService orderItemService;

        @Autowired
        private UserRepository userRepository;

        @GetMapping("/{userId}")
        public List<OrderItem> getOrderItems(@PathVariable Long userId) {
            return orderItemService.getOrderItemsByUserId(userId);
        }

        @GetMapping
        public List<OrderItem> getAllOrders() {
            return orderItemService.findAllOrders();
        }
        @PostMapping("/{userId}/items")
        public ResponseEntity<OrderItem> addOrderItem(@PathVariable Long userId, @RequestBody OrderItem OrderItem) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> {
                        logger.error("User not found with id {}", userId);
                        return new RuntimeException("User not found with id " + userId);
                    });
            OrderItem.setUser(user);
            OrderItem savedOrderItem = orderItemService.addOrderItem(OrderItem);
            return ResponseEntity.ok(savedOrderItem);
        }

        @PutMapping("/{userId}/items")
        public ResponseEntity<OrderItem> updateOrderItem(@PathVariable Long userId, @RequestBody OrderItem OrderItem) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> {
                        logger.error("User not found with id {}", userId);
                        return new RuntimeException("User not found with id " + userId);
                    });

            OrderItem.setUser(user);
            OrderItem updatedOrderItem = orderItemService.addOrderItem(OrderItem);
            return ResponseEntity.ok(updatedOrderItem);
        }

        @PutMapping("/items/{orderItemId}/status")
        public ResponseEntity<OrderItem> updateOrderItemStatus(@PathVariable Long orderItemId, @RequestParam String status) {
            try {
                OrderItem updatedOrderItem = orderItemService.updateOrderItemStatus(orderItemId, status);
                return ResponseEntity.ok(updatedOrderItem);
            } catch (Exception e) {
                logger.error("Failed to update status for OrderItemId {}: {}", orderItemId, e.getMessage());
                return ResponseEntity.status(500).build();
            }
        }
        @DeleteMapping("/items/{OrderItemId}")
        public ResponseEntity<Void> removeOrderItem(@PathVariable Long OrderItemId) {
            orderItemService.removeOrderItem(OrderItemId);
            return ResponseEntity.noContent().build();
        }

        @DeleteMapping("/{userId}/clear")
        public ResponseEntity<Void> clearOrder(@PathVariable Long userId) {
            orderItemService.clearOrder(userId);
            return ResponseEntity.noContent().build();
        }
    }


