package com.vivek.backend.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String role; // "company" or "enthusiast"
    private String email;
    private String password;
}
