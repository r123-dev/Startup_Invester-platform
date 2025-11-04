import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SearchResult({ query }) {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" fontWeight={600}>
        🔍 Results for: <span style={{ color: "#1976d2" }}>{query}</span>
      </Typography>
      <Typography sx={{ mt: 1, opacity: 0.7 }}>
        (Company & startup posts matching your query)
      </Typography>
    </Box>
  );
}
