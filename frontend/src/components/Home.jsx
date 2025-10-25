import React from "react";
import { Box, Typography } from "@mui/material";

export default function Home({ query }) {
  return (
    <Box sx={{ mt: 14, textAlign: "center" }}>
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
    </Box>
  );
}
