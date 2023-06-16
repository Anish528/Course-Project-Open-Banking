package com.dev.banking.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dev.banking.model.User;
import com.dev.banking.payload.ApiResponse;
import com.dev.banking.payload.JwtAuthenticationResponse;
import com.dev.banking.payload.LoginRequest;
import com.dev.banking.payload.SignUpRequest;
import com.dev.banking.payload.UserIdentityAvailability;
import com.dev.banking.payload.UserSummary;
import com.dev.banking.repository.UserRepository;
import com.dev.banking.security.CurrentUser;
import com.dev.banking.security.JwtTokenProvider;
import com.dev.banking.security.UserPrincipal;

@RestController
@RequestMapping("/oauth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmailId(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	@SuppressWarnings("unchecked")
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (userRepository.existsByEmailId(signUpRequest.getEmailId())) {
			return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getEmailId(), signUpRequest.getPassword());

		user.setPassword(passwordEncoder.encode(user.getPassword()));

		user.setRole(signUpRequest.getRole());
		user.setActive(false);
		user.setMobileNumber(signUpRequest.getMobileNumber());
		user.setAddress(signUpRequest.getAddress());
		user.setGender(signUpRequest.getGender());
		userRepository.save(user);

		return ResponseEntity.ok(new ApiResponse(true, "success"));
	}

	@GetMapping("/user/me")
	public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		String role = "";
		for (GrantedAuthority grantedAuthority : currentUser.getAuthorities()) {
			role = grantedAuthority.getAuthority();
		}
		UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(),
				role);
		return userSummary;
	}

	@GetMapping("/checkUsernameAvailability")
	public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
		Boolean isAvailable = !userRepository.existsByEmailId(username);
		return new UserIdentityAvailability(isAvailable);
	}

	@PostMapping("/check_token")
	@ResponseBody
	public Map<String, Object> checkToken(@RequestParam(value = "token") String jwt) {
		Map<String, Object> response = new HashMap<>();
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
        	response.put("userid", tokenProvider.getUserIdFromJWT(jwt));
        	return response;
		}else {
			throw new InvalidTokenException("Token has expired");			
		}

	}
}
