package com.vivek.backend.backend.repository;

import com.vivek.backend.backend.model.Enthusiast;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnthusiastRepository extends JpaRepository<Enthusiast, Long> {
    Optional<Enthusiast> findByEmail(String email);
}
