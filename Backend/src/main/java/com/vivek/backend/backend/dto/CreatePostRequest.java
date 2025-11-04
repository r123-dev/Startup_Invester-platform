package com.vivek.backend.backend.dto;

import lombok.Data;

/**
 * Used when a company creates a post.
 */
@Data
public class CreatePostRequest {
    private String companyEmail; // or you can get from JWT later
    private String title;
    private String content;
    private String mediaUrl; // optional
}
