import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,Link,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

export default function LoginCompany() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔗 API call -> http://localhost:PORT/api/company/login
    console.log("Login data:", formData);
  };

  return (
    <Grid container sx={{ minHeight:"100vh"
        }}>
      {/* Left Side Form */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          elevation={6}
          sx={{ p: 3, borderRadius: "20px", width: "80%", maxWidth: 450 }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Company Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "30px",
                fontSize: "16px",
                background: "linear-gradient(to right, #667eea, #764ba2)",
              }}
            >
              Login
            </Button>
             <Typography
  variant="body2"
  align="center"
  sx={{ mt: 2 }}
>
  Not registered?{" "}
  <Link href="/SignupCompany" underline="hover">
    Signup
  </Link>
</Typography>
          </form>
        </Paper>
      </Grid>

      {/* Right Side Illustration */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          background: "linear-gradient(to right, #667eea, #764ba2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexDirection: "column",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="h6">
          Login to manage your company services with Amazori.
        </Typography>
      </Grid>
    </Grid>
  );
}
