package com.vivek.backend.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)


    private String companyName;
    private String email;
    private String password;
    private String regNumber;
    private String sector;
    private String location;
}
