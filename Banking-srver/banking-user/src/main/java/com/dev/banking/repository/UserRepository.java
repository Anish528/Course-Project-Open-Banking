package com.dev.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.banking.model.User;

public interface UserRepository extends JpaRepository<User,Long> {

	List<User> findAllByRole(String string);

}