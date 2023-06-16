package com.dev.banking.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.banking.model.TransferDetails;
import com.dev.banking.model.Wallet;
import com.dev.banking.payload.AddMoneyRequest;
import com.dev.banking.payload.SendMoneyRequest;
import com.dev.banking.repository.PaymentsRepository;
import com.dev.banking.repository.WalletRepository;

@RestController
@RequestMapping("/wallet")
public class PaymentsController {
	
	@Autowired
	PaymentsRepository paymentsRepository;
	
	@Autowired
	WalletRepository walletRepository;
	
	@GetMapping("/getdetails/{userId}")
	public Wallet getWalletDetails(@PathVariable String userId) {
		Wallet wallet= walletRepository.findByUserId(Long.valueOf(userId));
		if(null == wallet) {
			Wallet newWallet = new Wallet(Long.valueOf(userId), 0d, new Date());
			walletRepository.save(newWallet);
		}
		return wallet;
	}
	
	@PutMapping("/addmoney")
	public Wallet addMoney(@RequestBody AddMoneyRequest request) {
		Wallet wallet= walletRepository.findByUserId(request.getUserId());
		wallet.setWalletBalance(wallet.getWalletBalance()+request.getAmount());
		wallet.setLastUpdatedDate(new Date());
		TransferDetails details = new TransferDetails(request.getUserId(), request.getAmount(), "DEBIT","",
				"", "", "", wallet.getWalletBalance(), wallet.getLastUpdatedDate());
		paymentsRepository.save(details);
		return walletRepository.save(wallet);
	}

	@PutMapping("/sendmoney")
	public Wallet sendMoney(@RequestBody SendMoneyRequest request) throws Exception {
		Wallet wallet= walletRepository.findByUserId(request.getUserId());
		if(request.getTransferAmount() < wallet.getWalletBalance()) {
			wallet.setWalletBalance(wallet.getWalletBalance()-request.getTransferAmount());
			wallet.setLastUpdatedDate(new Date());
			TransferDetails details = new TransferDetails(request.getUserId(), request.getTransferAmount(), "CREDIT", request.getTransferAccountName(),
					request.getTransferAccountNumber(), request.getTransferAccountIfsc(), request.getTransferAccountbank(), wallet.getWalletBalance(), wallet.getLastUpdatedDate());
			paymentsRepository.save(details);
			return walletRepository.save(wallet);
		}else {
			throw new Exception("Transfer Amount is greater than wallet balance");
		}
	}

	@GetMapping("/transactions/{userId}")
	public List<TransferDetails> getTransactionDetails(@PathVariable String userId) {
		try {			
			return paymentsRepository.findByUserIdOrderByPaymentDateDesc(Long.valueOf(userId));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return new ArrayList<>();
	}
}
