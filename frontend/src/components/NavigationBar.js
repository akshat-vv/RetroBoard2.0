import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Link,
  IconButton,
  Drawer,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "./Login"; // Import Login component
import Signup from "./Signup"; // Import Signup component
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const NavigationBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem("token") ? true : false); // Tracks user login state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleOpen = (content) => {
    setModalContent(content); // Set content to either 'login' or 'signup'
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setModalContent(null); // Reset modal content
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.clear();
    setUserLoggedIn(false);
    // setUser(null);
    navigate('/');
    setDrawerOpen(false);
  };

  const goToDashboard = ()=>{
    navigate('/');
  }

  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px 20px 30px 20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Left Side - Retro Board 2.0 */}
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, cursor:'pointer' }} onClick={goToDashboard}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Retro Board{" "}
          <Box component="span" color="highlight.main">
            2.0
          </Box>
        </Typography>
      </Box>

      {/* Hamburger Icon for Mobile */}
      <IconButton
        color="inherit"
        aria-label="menu"
        sx={{ display: { xs: "block", sm: "none" } }} // Show only on small screens
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            paddingTop: 3,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Link href="/" color="inherit" underline="none">
            <Button color="inherit" sx={{ marginY: 2 }}>
              Home
            </Button>
          </Link>
          <Link href="/board" color="inherit" underline="none">
            <Button color="inherit" sx={{ marginY: 2 }}>
              Board
            </Button>
          </Link> */}
          {!userLoggedIn ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ marginY: 2 }}
                onClick={() => handleOpen("login")}
              >
                Login
                <LoginIcon sx={{ml:1}} color="highlight"/>
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginY: 2 }}
                onClick={() => handleOpen("signup")}
              >
                Signup
                <PersonOutlineIcon sx={{ml:1}} color="white"/>
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              sx={{ marginY: 2 }}
              onClick={handleLogout}
            >
              Logout
              <LogoutIcon sx={{ml:1}} color="highlight"/>
            </Button>
          )}
        </Box>
      </Drawer>

      {/* Centered Links for Desktop */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          flexGrow: 2,
        }}
      >
        {/* <Link href="/" color="inherit" underline="none">
          <Button color="inherit" sx={{ marginX: 2 }}>
            Home
          </Button>
        </Link>
          <Button color="inherit" sx={{ marginX: 2 }}>
            Board
          </Button> */}
      </Box>

      {/* Desktop Actions */}
      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
        {!userLoggedIn ? (
          <>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleOpen("login")}
            >
              Login
              <LoginIcon sx={{ml:1}} color="highlight"/>
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen("signup")}
            >
              Signup
              <PersonOutlineIcon sx={{ml:1}} color="white"/>
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
            <LogoutIcon sx={{ml:1}} color="highlight"/>
          </Button>
        )}
      </Box>

      {/* Modal for Login/Signup */}
      {modalContent && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              padding: 3,
              backgroundColor: "white",
              borderRadius: "8px",
              width: "400px",
              margin: "auto",
              marginTop: "20vh",
            }}
          >
            {modalContent === "login" && (
              <Login
                changeModalContent={setModalContent}
                onLogin={() => {
                  setUserLoggedIn(true); // Log user in on successful login
                  handleClose();
                  setDrawerOpen(false);
                }}
              />
            )}
            {modalContent === "signup" && (
              <Signup
                changeModalContent={setModalContent}
                onSignup={() => {
                  setUserLoggedIn(true); // Log user in on successful signup
                  handleClose();
                }}
              />
            )}
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default NavigationBar;
