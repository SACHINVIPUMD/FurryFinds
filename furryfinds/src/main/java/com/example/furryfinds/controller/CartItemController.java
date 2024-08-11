package com.example.furryfinds.controller;

import com.example.furryfinds.entity.CartItem;
import com.example.furryfinds.entity.User;
import com.example.furryfinds.repository.UserRepository;
import com.example.furryfinds.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartItemController {

    private static final Logger logger = LoggerFactory.getLogger(CartItemController.class);

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public List<CartItem> getCartItems(@PathVariable Long userId) {
        return cartItemService.getCartItemsByUserId(userId);
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartItem> addCartItem(@PathVariable Long userId, @RequestBody CartItem cartItem) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    logger.error("User not found with id {}", userId);
                    return new RuntimeException("User not found with id " + userId);
                });

        cartItem.setUser(user);
        CartItem savedCartItem = cartItemService.addCartItem(cartItem);
        return ResponseEntity.ok(savedCartItem);
    }

    @PutMapping("/{userId}/items")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long userId, @RequestBody CartItem cartItem) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    logger.error("User not found with id {}", userId);
                    return new RuntimeException("User not found with id " + userId);
                });

        cartItem.setUser(user);
        CartItem updatedCartItem = cartItemService.addCartItem(cartItem);
        return ResponseEntity.ok(updatedCartItem);
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartItemId) {
        cartItemService.removeCartItem(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartItemService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}


