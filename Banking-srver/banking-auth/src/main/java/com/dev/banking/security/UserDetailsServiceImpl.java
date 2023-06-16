package com.dev.banking.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev.banking.exception.ResourceNotFoundException;
import com.dev.banking.model.User;
import com.dev.banking.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmailIdAndIsActive(username, true)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username : " + username)
        );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", userId)
        );

        return UserPrincipal.create(user);
    }
}