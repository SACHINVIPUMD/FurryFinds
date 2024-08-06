package com.example.furryfinds.service;

import com.example.furryfinds.entity.User;
import com.example.furryfinds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Store plain password for simplicity; in production, always use hashed passwords
        if(userRepository.findByEmail(user.getEmail()) == null) {
            return userRepository.save(user);
        }
        return null;

    }

    public ResponseEntity<User> loginUser(User user) {
        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>(foundUser.get() , HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}