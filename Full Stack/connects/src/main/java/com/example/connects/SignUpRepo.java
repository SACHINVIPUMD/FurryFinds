package com.example.connects;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SignUpRepo extends JpaRepository<SignUpEntity,Integer>{

	SignUpEntity findByEmail(String email);

}
