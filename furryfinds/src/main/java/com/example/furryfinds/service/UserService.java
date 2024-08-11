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

    public ResponseEntity<User> registerUser(User user) {
        if(userRepository.findByEmail(user.getEmail()).isEmpty()) {
            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.IM_USED);
    }

    public ResponseEntity<User> loginUser(User user) {
        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>(foundUser.get() , HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    public Optional<User> updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setAddress(updatedUser.getAddress());
            user.setPhno(updatedUser.getPhno());
            return userRepository.save(user);
        });
    }
}

