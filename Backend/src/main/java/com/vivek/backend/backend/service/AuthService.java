package com.vivek.backend.backend.service;

import com.vivek.backend.backend.dto.LoginRequest;
import com.vivek.backend.backend.dto.SignupRequest;
import com.vivek.backend.backend.model.Company;
import com.vivek.backend.backend.model.Enthusiast;
import com.vivek.backend.backend.repository.CompanyRepository;
import com.vivek.backend.backend.repository.EnthusiastRepository;
import com.vivek.backend.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final CompanyRepository companyRepository;
    private final EnthusiastRepository enthusiastRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public String signup(SignupRequest request) {
        int fieldCount = 0;
        if (request.getCompanyName() != null) fieldCount++;
        if (request.getRegNumber() != null) fieldCount++;
        if (request.getSector() != null) fieldCount++;
        if (request.getLocation() != null) fieldCount++;
        if (fieldCount>3){
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

//    public String login(LoginRequest request) {
//        int fieldCount = 0;
//       if (request.getEmail()!=null) {
//            Company company = companyRepository.findByEmail(request.getEmail())
//                    .orElseThrow(() -> new RuntimeException("Company not found"));
//            if (!passwordEncoder.matches(request.getPassword(), company.getPassword()))
//                throw new RuntimeException("Invalid credentials");
//        } else {
//            Enthusiast enthusiast = enthusiastRepository.findByEmail(request.getEmail())
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//            if (!passwordEncoder.matches(request.getPassword(), enthusiast.getPassword()))
//                throw new RuntimeException("Invalid credentials");
//        }
//        return jwtUtil.generateToken(request.getEmail());
//    }
public String login(LoginRequest request) {
    String email = request.getEmail();
    String password = request.getPassword();

    // 1️⃣ Check if email belongs to a company
    Optional<Company> companyOpt = companyRepository.findByEmail(email);

    if (companyOpt.isPresent()) {
        Company company = companyOpt.get();

        // Validate password
        if (!passwordEncoder.matches(password, company.getPassword())) {
            throw new RuntimeException("Invalid credentials for company");
        }

        // You can include company details or role in the token
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "company");
        claims.put("regNumber", company.getRegNumber());
        claims.put("sector", company.getSector());

        return jwtUtil.generateToken(email);
    }

    // 2️⃣ Check if email belongs to an enthusiast
    Optional<Enthusiast> enthusiastOpt = enthusiastRepository.findByEmail(email);

    if (enthusiastOpt.isPresent()) {
        Enthusiast enthusiast = enthusiastOpt.get();

        // Validate password
        if (!passwordEncoder.matches(password, enthusiast.getPassword())) {
            throw new RuntimeException("Invalid credentials for enthusiast");
        }

        // Add role claim for enthusiast
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "enthusiast");

        return jwtUtil.generateToken(email);
    }


    throw new RuntimeException("No user found with email: " + email);
}

}
