package com.dev.banking.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.banking.model.User;
import com.dev.banking.payload.ActivateUserRequest;
import com.dev.banking.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	
	@GetMapping("/all")
	public List<User> getAllUsers() {
		return userRepository.findAllByRole("USER");
	}
	
	@PutMapping("/activate")
	public User activateUser(@RequestBody ActivateUserRequest request) {
		Optional<User> userResp = userRepository.findById(request.getUserId());
		
		if(userResp.isPresent()) {
			User user = userResp.get();
			user.setActive(true);
			return userRepository.save(user);
		}
		return null;
	}

	@PutMapping("/generate-account-num")
	public User generateAccountNumber(@RequestBody ActivateUserRequest request) {
		Optional<User> userResp = userRepository.findById(request.getUserId());
		
		if(userResp.isPresent()) {
			User user = userResp.get();
			user.setAccountNumber(""+System.currentTimeMillis());
			return userRepository.save(user);
		}
		return null;
	}

	@GetMapping("/details/{userId}")
	public User getUserDetails(@PathVariable Long userId) {
		Optional<User> userResp = userRepository.findById(userId);
		if(userResp.isPresent()) {
			return userResp.get();
		}
		return null;
	}

}
