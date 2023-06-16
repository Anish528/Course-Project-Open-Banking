package com.dev.banking.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class TransferDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long userId;
	private Double transferAmount;
	private String transferType;
	private String transferAccountName;
	private String transferAccountNumber;
	private String transferAccountIfsc;
	private String transferAccountbank;
	private Double balanceWalletAmount;
	private Date paymentDate;

	public TransferDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public TransferDetails(Long userId, Double transferAmount, String transferType, String transferAccountName,
			String transferAccountNumber, String transferAccountIfsc, String transferAccountbank,
			Double balanceWalletAmount, Date paymentDate) {
		super();
		this.userId = userId;
		this.transferAmount = transferAmount;
		this.transferType = transferType;
		this.transferAccountName = transferAccountName;
		this.transferAccountNumber = transferAccountNumber;
		this.transferAccountIfsc = transferAccountIfsc;
		this.transferAccountbank = transferAccountbank;
		this.balanceWalletAmount = balanceWalletAmount;
		this.paymentDate = paymentDate;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Double getTransferAmount() {
		return transferAmount;
	}

	public void setTransferAmount(Double transferAmount) {
		this.transferAmount = transferAmount;
	}

	public String getTransferAccountName() {
		return transferAccountName;
	}

	public void setTransferAccountName(String transferAccountName) {
		this.transferAccountName = transferAccountName;
	}

	public String getTransferAccountNumber() {
		return transferAccountNumber;
	}

	public void setTransferAccountNumber(String transferAccountNumber) {
		this.transferAccountNumber = transferAccountNumber;
	}

	public String getTransferAccountIfsc() {
		return transferAccountIfsc;
	}

	public void setTransferAccountIfsc(String transferAccountIfsc) {
		this.transferAccountIfsc = transferAccountIfsc;
	}

	public String getTransferAccountbank() {
		return transferAccountbank;
	}

	public void setTransferAccountbank(String transferAccountbank) {
		this.transferAccountbank = transferAccountbank;
	}

	public Double getBalanceWalletAmount() {
		return balanceWalletAmount;
	}

	public void setBalanceWalletAmount(Double balanceWalletAmount) {
		this.balanceWalletAmount = balanceWalletAmount;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getTransferType() {
		return transferType;
	}

	public void setTransferType(String transferType) {
		this.transferType = transferType;
	}

}
