package com.example.connects;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {

	@Autowired
	SignUpRepo sur;
	public SignUpEntity postData(SignUpEntity data) {
		// TODO Auto-generated method stub
		return sur.save(data); 
	}
	public List<SignUpEntity> getAllData() {
		// TODO Auto-generated method stub
		return sur.findAll();
	}

}
