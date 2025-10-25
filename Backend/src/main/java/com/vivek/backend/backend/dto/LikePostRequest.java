package com.vivek.backend.backend.dto;

import lombok.Data;

/**
 * Used when an enthusiast likes a post.
 */
@Data
public class LikePostRequest {
    private String enthusiastEmail; // or get from JWT in secured flow
}
