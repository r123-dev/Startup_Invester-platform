import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function Home({ query }) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Load posts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts/all")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // ✅ Decode token to get user info
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log("Decoded user:", decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  // ✅ Handle like click
  const handleLike = async (postId) => {
    if (!user) {
      alert("Please log in as an enthusiast to like posts.");
      return;
    }

    if (user.role === "company") {
      alert("Companies cannot like posts.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/posts/like/${postId}`,
        { enthusiastEmail: user.sub || user.email } // 🧠 use `sub` if your token stores email there
      );

      const updatedPost = response.data;

      // ✅ Update local post list with new like count
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Box sx={{ mt: 14, textAlign: "center", px: 2 }}>
      {/* Header Section */}
      {query ? (
        <>
          <Typography variant="h6">
            🔍 Results for: <strong>{query}</strong>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            (Companies matching "{query}" appear here)
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6">🏠 Home Feed</Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            Posts by companies and startups appear here.
          </Typography>
        </>
      )}

      {/* Feed Section */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        {posts.length === 0 ? (
          <Typography sx={{ opacity: 0.7 }}>No posts available.</Typography>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                width: "100%",
                maxWidth: 600,
                textAlign: "left",
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>
                  {post.companyName ? post.companyName[0].toUpperCase() : "C"}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.companyName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.companyEmail}
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ px: 0 }}>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  {/* 👍 Like Section */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleLike(post.id)}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {post.likeCount} Likes
                    </Typography>
                  </Box>

                  {/* Funding Tag */}
                  {post.eligibleForFunding && (
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{
                        fontWeight: "bold",
                        border: "1px solid",
                        borderColor: "success.main",
                        borderRadius: "12px",
                        px: 1.5,
                        py: 0.3,
                      }}
                    >
                      Eligible for Funding
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
