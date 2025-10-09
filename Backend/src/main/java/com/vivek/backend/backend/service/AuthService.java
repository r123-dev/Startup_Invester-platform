package com.vivek.backend.backend.service;

import com.vivek.backend.dto.LoginRequest;
import com.vivek.backend.dto.SignupRequest;
import com.vivek.backend.model.Company;
import com.vivek.backend.model.Enthusiast;
import com.vivek.backend.repository.CompanyRepository;
import com.vivek.backend.repository.EnthusiastRepository;
import com.vivek.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final CompanyRepository companyRepository;
    private final EnthusiastRepository enthusiastRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public String signup(SignupRequest request) {
        if (request.getRole().equalsIgnoreCase("company")) {
            Company company = Company.builder()
                    .companyName(request.getCompanyName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .regNumber(request.getRegNumber())
                    .sector(request.getSector())
                    .location(request.getLocation())
                    .build();
            companyRepository.save(company);
            return jwtUtil.generateToken(request.getEmail());
        } else {
            Enthusiast enthusiast = Enthusiast.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build();
            enthusiastRepository.save(enthusiast);
            return jwtUtil.generateToken(request.getEmail());
        }
    }

    public String login(LoginRequest request) {
        if (request.getRole().equalsIgnoreCase("company")) {
            Company company = companyRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Company not found"));
            if (!passwordEncoder.matches(request.getPassword(), company.getPassword()))
                throw new RuntimeException("Invalid credentials");
        } else {
            Enthusiast enthusiast = enthusiastRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            if (!passwordEncoder.matches(request.getPassword(), enthusiast.getPassword()))
                throw new RuntimeException("Invalid credentials");
        }
        return jwtUtil.generateToken(request.getEmail());
    }
}
