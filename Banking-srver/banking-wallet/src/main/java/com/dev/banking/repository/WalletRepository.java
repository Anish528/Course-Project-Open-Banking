package com.dev.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.banking.model.Wallet;

public interface WalletRepository extends JpaRepository<Wallet,Long> {

	Wallet findByUserId(Long userId);

}
