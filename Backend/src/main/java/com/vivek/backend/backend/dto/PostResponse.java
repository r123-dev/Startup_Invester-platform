package com.vivek.backend.backend.dto;

import lombok.Data;

import java.time.Instant;
import java.util.Set;

/**
 * Response DTO for returning post data to frontend
 */
@Data
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String companyEmail;
    private String companyName;
    private int likeCount;
    private boolean eligibleForFunding;
    private Set<String> likedByEmails;
    private Instant createdAt;
}
