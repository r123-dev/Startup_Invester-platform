import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Investor() {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" fontWeight={600}>
        💰 Investor Section
      </Typography>
      <Typography sx={{ mt: 1, opacity: 0.7 }}>
        (All registered investors list here)
      </Typography>
    </Box>
  );
}
