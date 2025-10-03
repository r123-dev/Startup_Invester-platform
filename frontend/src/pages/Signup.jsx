import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  MenuItem,Link,
} from "@mui/material";
import {
  Business,
  Email,
  Lock,
  LocationCity,
  Work,
  ConfirmationNumber,
  ViewWeek,
} from "@mui/icons-material";

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
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    regNumber: "",
    sector: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔗 API call -> http://localhost:PORT/api/company/signup
    console.log("Signup data:", formData);
  };

  return (
    <Grid container sx={{ width:"100%",
        Height:"100%",
        overflow:"hidden",
        position:"relative",
        margin: 0,
        padding:0
    }}>
      
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
          sx={{ p: 1.5, borderRadius: "20px", width: "80%", maxWidth: 450,position:"relative" }}
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

            <TextField
              fullWidth
              margin="normal"
              label="Registration Number"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
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

            <Typography
  variant="body2"
  align="center"
  sx={{ mt: 2 }}
>
  Already registered?{" "}
  <Link href="/LoginCompany" underline="hover">
    Sign in
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
          Welcome to Amazori
        </Typography>
        <Typography variant="h6">
          Manage your company presence on Amazon seamlessly.
        </Typography>
      </Grid>
    </Grid>
  );
}
