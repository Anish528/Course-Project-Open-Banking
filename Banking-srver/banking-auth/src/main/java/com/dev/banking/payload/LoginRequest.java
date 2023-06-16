package com.dev.banking.payload;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank
    private String emailId;

    @NotBlank
    private String password;

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
