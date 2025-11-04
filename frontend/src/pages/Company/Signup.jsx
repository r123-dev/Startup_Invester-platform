import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Link,
} from "@mui/material";
import {
  Business,
  Email,
  Lock,
  LocationCity,
  Work,
  ConfirmationNumber,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const sectors = [
  "IT",
  "Health Services",
  "Fintech",
  "EdTech",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Other",
];

export default function SignupCompany() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    regNumber: "",
    sector: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Auto-redirect if token exists and valid
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/Mainpage");
        } else {
          localStorage.removeItem("authToken");
        }
      } catch {
        localStorage.removeItem("authToken");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company name required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.regNumber) newErrors.regNumber = "Registration number required";
    if (!formData.sector) newErrors.sector = "Sector required";
    if (!formData.location) newErrors.location = "Location required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

     const text = await response.text();

    let token = null;
    try {
      const data = JSON.parse(text);
      token = data.token;
    } catch {
  
      token = text;
    }

    if (response.ok && token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", "company");
      navigate("/Mainpage");
    } else {
      alert("Signup failed or token not received");
    }
  } catch (err) {
    console.error("Error during signup:", err);
    alert("Something went wrong. Please try again later.");
  }
};


  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <Paper
          elevation={6}
          sx={{ p: 1.5, borderRadius: "20px", width: "80%", maxWidth: 450, position: "relative" }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Company Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              error={!!errors.companyName}
              helperText={errors.companyName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Registration Number"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
              error={!!errors.regNumber}
              helperText={errors.regNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumber />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              fullWidth
              margin="normal"
              label="Sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              error={!!errors.sector}
              helperText={errors.sector}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                ),
              }}
            >
              {sectors.map((sector, index) => (
                <MenuItem key={index} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCity />
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
              Sign Up
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already registered?{" "}
              <Link href="/LoginCompany" underline="hover">
                Sign in
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>

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
          Welcome to Amazori
        </Typography>
        <Typography variant="h6">
          Manage your company presence on Amazon seamlessly.
        </Typography>
      </Grid>
    </Grid>
  );
}

