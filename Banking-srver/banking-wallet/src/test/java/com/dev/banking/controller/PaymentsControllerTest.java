package com.dev.banking.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.dev.banking.model.TransferDetails;
import com.dev.banking.model.Wallet;
import com.dev.banking.repository.PaymentsRepository;
import com.dev.banking.repository.WalletRepository;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = PaymentsController.class)
public class PaymentsControllerTest {


	@MockBean
	PaymentsRepository paymentsRepository;
	
	@MockBean
	WalletRepository walletRepository;
	
	@Autowired
	MockMvc mockMvc;
	
	@Test
	public void getTransactionDetailsTest() throws Exception {
		TransferDetails user= new TransferDetails(123456L, 100d, "DEBIT", "testeacccount", "687421165", "", "", 100d, new Date());
		when(paymentsRepository.findByUserIdOrderByPaymentDateDesc(Mockito.anyLong())).thenReturn(Arrays.asList(user));
		mockMvc.perform(MockMvcRequestBuilders.get(
				"/wallet/transactions/123456").accept(
				MediaType.APPLICATION_JSON)).andExpect(status().isOk())
		.andExpect(jsonPath("$[0].transferType").value("DEBIT"));
	}
	@Test
	public void getDetailsTest() throws Exception {
		Wallet wallet= new Wallet(12346L, 100d, new Date());
		when(walletRepository.findByUserId(Mockito.anyLong())).thenReturn(wallet);
		mockMvc.perform(MockMvcRequestBuilders.get(
				"/wallet/getdetails/123456").accept(
						MediaType.APPLICATION_JSON)).andExpect(status().isOk())
		.andExpect(jsonPath("$.walletBalance").value("100.0"));
	}
	
	@Test
	public void addMoneyTest() throws Exception {
		Wallet wallet= new Wallet(12346L, 100d, new Date());
		when(walletRepository.findByUserId(Mockito.anyLong())).thenReturn(wallet);
		when(paymentsRepository.save(Mockito.any())).thenReturn(new TransferDetails());
		when(walletRepository.save(Mockito.any())).thenReturn(wallet);
		mockMvc.perform(MockMvcRequestBuilders.put(
				"/wallet/addmoney").accept(
						MediaType.APPLICATION_JSON).content("{\"userId\":1,\"amount\":100}")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful())
		.andExpect(jsonPath("$.walletBalance").value("200.0"));
	}
	
	@Test
	public void sendMoneyTest() throws Exception {
		Wallet wallet= new Wallet(12346L, 100d, new Date());
		when(walletRepository.findByUserId(Mockito.anyLong())).thenReturn(wallet);
		when(paymentsRepository.save(Mockito.any())).thenReturn(new TransferDetails());
		when(walletRepository.save(Mockito.any())).thenReturn(wallet);
		mockMvc.perform(MockMvcRequestBuilders.put(
				"/wallet/sendmoney").accept(
						MediaType.APPLICATION_JSON).content("{\"userId\":1,\"transferAmount\":10}")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().is2xxSuccessful())
		.andExpect(jsonPath("$.walletBalance").value("90.0"));
	}
}
