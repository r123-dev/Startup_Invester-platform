import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";

const roles = ["Investor", "Founder", "Enthusiast"];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our Platform
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Choose your role to continue
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {roles.map((role) => (
          <Grid item key={role}>
            <RoleCard onClick={() => navigate(`/login-${role.toLowerCase()}`)} role={role} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
