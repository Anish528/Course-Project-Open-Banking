package com.dev.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.banking.model.TransferDetails;

public interface PaymentsRepository extends JpaRepository<TransferDetails,Long> {

	List<TransferDetails> findByUserIdOrderByPaymentDateDesc(Long valueOf);

}
