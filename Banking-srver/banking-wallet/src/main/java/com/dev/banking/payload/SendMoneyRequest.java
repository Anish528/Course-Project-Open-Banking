package com.dev.banking.payload;

public class SendMoneyRequest {

	private Long userId;
	private Double transferAmount;
	private String transferAccountName;
	private String transferAccountNumber;
	private String transferAccountIfsc;
	private String transferAccountbank;

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

}
