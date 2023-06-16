package com.dev.banking.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dev.banking.model.User;
import com.dev.banking.repository.UserRepository;

@Component
public class UserService {

	@Autowired
	UserRepository repository;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	@PostConstruct
	public void init() {
		List<User> user = repository.findByRole("ADMIN");
		if(user.isEmpty()) {
			User adminUser = new User("Admin", "admin@banking.com", passwordEncoder.encode("admin"));
			adminUser.setRole("ADMIN");
			adminUser.setActive(true);
			repository.save(adminUser);
		}
	}
}
