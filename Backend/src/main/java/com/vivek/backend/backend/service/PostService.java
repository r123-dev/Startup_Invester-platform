package com.vivek.backend.backend.service;

import com.vivek.backend.backend.model.*;
import com.vivek.backend.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CompanyRepository companyRepository;
    private final EnthusiastRepository enthusiastRepository;

    private static final int LIKE_THRESHOLD = 10; // number of likes to be eligible

    // Create post by a company
    public Post createPost(String email, String title, String content) {
        Company company = companyRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Post post = Post.builder()
                .title(title)
                .content(content)
                .company(company)
                .likeCount(0)
                .eligibleForFunding(false)
                .build();

        return postRepository.save(post);
    }

    // Fetch all posts (for feed)
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Enthusiast likes a post
    public Post likePost(Long postId, String enthusiastEmail) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        System.out.println(enthusiastEmail);
        Enthusiast enthusiast = enthusiastRepository.findByEmailIgnoreCase(enthusiastEmail)
                .orElseThrow(() -> new RuntimeException("Enthusiast not found"));

        if (post.getLikedBy().contains(enthusiast)) {
            throw new RuntimeException("Already liked this post");
        }

        post.getLikedBy().add(enthusiast);
        post.setLikeCount(post.getLikeCount() + 1);

        if (post.getLikeCount() >= LIKE_THRESHOLD) {
            post.setEligibleForFunding(true);
        }

        return postRepository.save(post);
    }
}
