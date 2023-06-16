package com.dev.banking.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataAccessException;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.dev.banking.model.User;
import com.dev.banking.repository.UserRepository;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = UserController.class)
public class UserControllerTest {

	@MockBean
	UserRepository userRepository;
	
	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void getAllUsersTest() throws Exception {
		User user= new User("Test", "testemail@gmail.com", "687421165");
		when(userRepository.findAllByRole(Mockito.anyString())).thenReturn(Arrays.asList(user));
		mockMvc.perform(MockMvcRequestBuilders.get(
				"/user/all").accept(
				MediaType.APPLICATION_JSON)).andExpect(status().isOk())
		.andExpect(jsonPath("$[0].name").value("Test"));
	}
	
	@Test
	public void activateTest() throws Exception {
		User user = new User("Test", "testemail@gmail.com", "687421165");
		Optional<User> optionalUser= Optional.of(user);
		when(userRepository.findById(Mockito.anyLong())).thenReturn(optionalUser);
		when(userRepository.save(Mockito.any())).thenReturn(user);
		mockMvc.perform(MockMvcRequestBuilders.put(
				"/user/activate").accept(
						MediaType.APPLICATION_JSON).content("{\"userId\":1}")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful())
		.andExpect(jsonPath("$.name").value("Test"));
	}

	
	@Test
	public void genAccountNumTest() throws Exception {
		User user = new User("Test", "testemail@gmail.com", "687421165");
		Optional<User> optionalUser= Optional.of(user);
		when(userRepository.findById(Mockito.anyLong())).thenReturn(optionalUser);
		when(userRepository.save(Mockito.any())).thenReturn(user);
		mockMvc.perform(MockMvcRequestBuilders.put(
				"/user/generate-account-num").accept(
						MediaType.APPLICATION_JSON).content("{\"userId\":1}")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful())
		.andExpect(jsonPath("$.name").value("Test"));
	}

}
