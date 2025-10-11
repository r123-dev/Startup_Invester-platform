package com.vivek.backend.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enthusiast {
    @Id

    @Column(nullable = false, unique = true) // email becomes the primary key
   // private String email;


    private String email;
    private String password;
}
