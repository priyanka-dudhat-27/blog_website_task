/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store'; // Adjust the import path as needed

const Header = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Adjust breakpoint as needed

  const handleLogout = () => {
    dispatch(authActions.Logout());
    navigate("/auth");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(88,9,121,0.8436624649859944) 35%, rgba(0,212,255,1) 100%)',
      }}
    >
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          BlogsApp
        </Typography>
        {isLoggedIn && !isMobile && (
          <Box display="flex" flexGrow={1} justifyContent="center">
            <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
              <Tab LinkComponent={Link} to="/" label="All Blogs" />
              <Tab LinkComponent={Link} to="/userblogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/addblogs" label="Add Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" alignItems="center">
          {!isLoggedIn ? (
            <>
              <Button LinkComponent={Link} to="/auth" color="warning" variant="contained" sx={{ borderRadius: 10, margin: 1 }}>
                Signup
              </Button>
              <Button LinkComponent={Link} to="/auth" color="warning" variant="contained" sx={{ borderRadius: 10, margin: 1 }}>
                Login
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              color="warning"
              variant="contained"
              sx={{ borderRadius: 10, margin: 1 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
      {isLoggedIn && isMobile && (
        <Box display="flex" flexDirection="column" alignItems="center" padding={1}>
          <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)} centered>
            <Tab LinkComponent={Link} to="/" label="All Blogs" />
            <Tab LinkComponent={Link} to="/userblogs" label="My Blogs" />
            <Tab LinkComponent={Link} to="/addblogs" label="Add Blogs" />
          </Tabs>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
