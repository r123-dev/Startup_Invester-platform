package com.vivek.backend.backend.controller;

import com.vivek.backend.backend.dto.CreatePostRequest;
import com.vivek.backend.backend.dto.LikePostRequest;
import com.vivek.backend.backend.dto.PostResponse;
import com.vivek.backend.backend.model.Post;
import com.vivek.backend.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PostController {

    private final PostService postService;

    @PostMapping("/create")
    public PostResponse createPost(@RequestBody CreatePostRequest req) {
        Post post = postService.createPost(req.getCompanyEmail(), req.getTitle(), req.getContent());
        return toDto(post);
    }

    @GetMapping("/all")
    public List<PostResponse> getAllPosts() {
        return postService.getAllPosts().stream().map(this::toDto).collect(Collectors.toList());
    }

    @PostMapping("/like/{postId}")
    public PostResponse likePost(@PathVariable Long postId, @RequestBody LikePostRequest req) {
        Post post = postService.likePost(postId, req.getEnthusiastEmail());
        return toDto(post);
    }

    // helper to convert entity -> DTO
    private PostResponse toDto(Post p) {
        PostResponse r = new PostResponse();
        r.setId(p.getId());
        r.setTitle(p.getTitle());
        r.setContent(p.getContent());
        if (p.getCompany() != null) {
            r.setCompanyEmail(p.getCompany().getEmail());
            r.setCompanyName(p.getCompany().getCompanyName());
        }
        r.setLikeCount(p.getLikeCount());
        r.setEligibleForFunding(p.isEligibleForFunding());
        r.setCreatedAt(null); // set if you add createdAt to Post (Optional)
        // likedByEmails
        if (p.getLikedBy() != null) {
            r.setLikedByEmails(p.getLikedBy().stream().map(e -> e.getEmail()).collect(Collectors.toSet()));
        }
        return r;
    }
}

