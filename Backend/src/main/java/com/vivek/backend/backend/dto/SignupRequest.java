package com.vivek.backend.backend.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String role; // "company" or "enthusiast"
    private String companyName;
    private String email;
    private String password;
    private String regNumber;
    private String sector;
    private String location;
}
