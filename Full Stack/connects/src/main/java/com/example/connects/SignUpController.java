package com.example.connects;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class SignUpController {

	@Autowired
	SignUpService sus;
	
	@Autowired
	SignUpRepo sur;
	
	@PostMapping("/reg")
	public SignUpEntity post(@RequestBody SignUpEntity data) {
		return sus.postData(data);
	}
	
	@PostMapping("/login")
    public SignUpEntity loginUser(@RequestBody SignUpEntity loginDetails) {
		SignUpEntity user= sur.findByEmail(loginDetails.getEmail());
        if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid login credentials");
        }
    }
	
	@GetMapping("/get")
	public List<SignUpEntity> getData(){
		return sus.getAllData();
	}
}
