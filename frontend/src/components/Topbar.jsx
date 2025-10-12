import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Investor
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; // Startup
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function FloatingNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Investor', icon: <AccountBalanceIcon /> },
    { label: 'Startup', icon: <RocketLaunchIcon /> },
    { label: 'Profile', icon: <AccountCircleIcon /> },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 90,
        zIndex: 1200,
        overflow: 'visible',
      }}
    >
      {/* ======= Full-width animated gradient background ======= */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(90deg, #6a11cb, #2575fc, #ff0080, #6a11cb)',
          backgroundSize: '400% 400%',
          filter: 'blur(20px)',
          opacity: 0.7,
          animation: 'moveGradient 12s ease infinite',
          '@keyframes moveGradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
      />

      {/* ======= Floating Navbar Card ======= */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: 600,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            background:
              'linear-gradient(135deg, rgba(120,80,255,0.25), rgba(255,80,180,0.25), rgba(255,255,255,0.15))',
            boxShadow:
              '0 8px 25px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.4)',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow:
                '0 14px 40px rgba(0,0,0,0.35), inset 0 1px 3px rgba(255,255,255,0.4)',
            },
          }}
        >
          <AppBar
            position="static"
            color="transparent"
            sx={{
              boxShadow: 'none',
              background: 'transparent',
            }}
          >
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                minHeight: 64,
              }}
            >
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <Box
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? 'primary.main' : 'text.primary',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'scale(1.05)',
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
            </Toolbar>
          </AppBar>
        </Paper>
      </Box>
    </Box>
  );
}
