package com.dev.banking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dev.banking.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailId(String username);
    Optional<User> findByEmailIdAndIsActive(String username,boolean active);

    List<User> findByIdIn(List<Long> userIds);

    Boolean existsByEmailId(String username);

	List<User> findByRole(String string);

}
