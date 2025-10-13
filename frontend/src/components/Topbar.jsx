import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function FloatingNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const items = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Investor", icon: <AccountBalanceIcon /> },
    { label: "Startup", icon: <RocketLaunchIcon /> },
    { label: "Profile", icon: <AccountCircleIcon /> },
  ];

  const toggleSearch = () => setSearchOpen((prev) => !prev);

  const handleSearch = () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    // Set Home tab active and show search result
    setActiveIndex(0);
    setSearchResult(trimmed);

    // Close input smoothly
    setTimeout(() => {
      setSearchOpen(false);
      setSearchText("");
    }, 100);
  };

  // Render content based on active tab
  const renderContent = () => {
    if (activeIndex === 0) {
      return (
        <Box sx={{ mt: 14, textAlign: "center" }}>
          {searchResult ? (
            <>
              <Typography variant="h6">
                🔍 Results for: <strong>{searchResult}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                (Imagine search results displayed here...)
              </Typography>
            </>
          ) : (
            <Typography variant="h6">🏠 Welcome Home!</Typography>
          )}
        </Box>
      );
    } else if (activeIndex === 1) {
      return (
        <Box sx={{ mt: 14, textAlign: "center" }}>
          <Typography variant="h6">💰 Investor Section</Typography>
        </Box>
      );
    } else if (activeIndex === 2) {
      return (
        <Box sx={{ mt: 14, textAlign: "center" }}>
          <Typography variant="h6">🚀 Startup Section</Typography>
        </Box>
      );
    } else if (activeIndex === 3) {
      return (
        <Box sx={{ mt: 14, textAlign: "center" }}>
          <Typography variant="h6">👤 Profile Section</Typography>
        </Box>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 90,
          zIndex: 1200,
        }}
      >
        {/* Gradient background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #6a11cb, #2575fc, #ff0080)",
            filter: "blur(20px)",
            opacity: 0.7,
          }}
        />

        {/* Navbar container */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: searchOpen ? "95%" : "90%",
            maxWidth: searchOpen ? 750 : 600,
            transition: "width 0.4s ease, max-width 0.4s ease",
          }}
        >
          <Paper
            elevation={10}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              backdropFilter: "blur(12px)",
              background:
                "linear-gradient(135deg, rgba(120,80,255,0.25), rgba(255,80,180,0.25), rgba(255,255,255,0.15))",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.4)",
              transition: "all 0.4s ease",
            }}
          >
            <AppBar
              position="static"
              color="transparent"
              sx={{ boxShadow: "none", background: "transparent" }}
            >
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  minHeight: 64,
                  px: 3,
                }}
              >
                {/* Main navbar items */}
                {items.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <Box
                      key={idx}
                      onClick={() => {
                        setActiveIndex(idx);
                        setSearchResult(null);
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? "primary.main" : "text.primary",
                        transition: "color 0.3s ease, transform 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          color: "primary.main",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <IconButton color="inherit" size="large">
                        {item.icon}
                      </IconButton>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {item.label}
                      </Typography>
                    </Box>
                  );
                })}

                {/* Search button + label */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 1,
                  }}
                >
                  {!searchOpen ? (
                    <>
                      <IconButton color="inherit" onClick={toggleSearch}>
                        <SearchIcon />
                      </IconButton>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Search
                      </Typography>
                    </>
                  ) : (
                    <Box
                      component="form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                      }}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        autoFocus
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{
                          width: 160,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                            backgroundColor: "rgba(255,255,255,0.3)",
                            "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                            "&:hover fieldset": { borderColor: "#fff" },
                            "&.Mui-focused fieldset": { borderColor: "#fff" },
                          },
                        }}
                      />
                      <IconButton color="inherit" onClick={toggleSearch}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Toolbar>
            </AppBar>
          </Paper>
        </Box>
      </Box>

      {/* Render content below navbar */}
      <Box sx={{ mt: 10 }}>{renderContent()}</Box>
    </>
  );
}






