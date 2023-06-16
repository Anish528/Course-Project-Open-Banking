package com.dev.banking.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.dev.banking.repository.UserRepository;
import com.dev.banking.security.JwtAuthenticationEntryPoint;
import com.dev.banking.security.JwtTokenProvider;
import com.dev.banking.security.UserDetailsServiceImpl;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = AuthController.class)
public class AuthControllerTest {

	//@Autowired
	//AuthController authController;
	

	@MockBean
	AuthenticationManager authenticationManager;

	@MockBean
	PasswordEncoder passwordEncoder;

	@MockBean
	JwtTokenProvider tokenProvider;

	
	@MockBean
	UserDetailsServiceImpl detailsServiceImpl;
	@MockBean
	JwtAuthenticationEntryPoint authenticationEntryPoint;
	
	@MockBean
	UserRepository userRepository;
	
	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void checkUserNameAvailability() throws Exception {
		when(userRepository.existsByEmailId(Mockito.anyString())).thenReturn(true);
		mockMvc.perform(MockMvcRequestBuilders.get(
				"/oauth/checkUsernameAvailability?username=1235678").accept(
				MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}

}
