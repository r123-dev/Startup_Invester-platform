import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";

const roles = ["Company", "Enthusiast"];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        margin: 0,
        padding: 0,
        backgroundColor: "#000", // fallback
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    zIndex: 0,
  }}
      >
        <source src="/videos/startup.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          px: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Our Platform
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Choose your role to continue
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {roles.map((role) => (
            <Grid item key={role}>
              <RoleCard
                onClick={() => navigate(`/Signup${role}`)}
                role={role}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;


