import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Profile() {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" fontWeight={600}>
        👤 Profile Section
      </Typography>
      <Typography sx={{ mt: 1, opacity: 0.7 }}>
        (User details & settings)
      </Typography>
    </Box>
  );
}
