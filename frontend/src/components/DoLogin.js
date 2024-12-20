import React from "react";
import { Typography, Box } from "@mui/material";
import LoginImage from '../assets/images/login.png';
const DoLogin = () => {
  return (
<Box sx={{ textAlign: "center", padding: 2, overflow: 'hidden' }}>
  <Typography 
    variant="h3" 
    color="secondary" 
    sx={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      marginBottom: 3, // Adds space below the title
    }}
  >
    Login to Access the Board{" "}
  </Typography>
  
  <Box 
    sx={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      overflow: 'hidden', // Ensures the image doesn't overflow out of its container
      width: '100%', 
    }}
  >
    <img
      srcSet={`${LoginImage}?w=600&h=600&fit=crop&auto=format 600w, ${LoginImage}?w=900&h=900&fit=crop&auto=format 900w, ${LoginImage}?w=1200&h=1200&fit=crop&auto=format 1200w`}
      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 900px"
      src={LoginImage} // Fallback image
      alt="Login illustration"
      loading="lazy" // Lazy loading for better performance
      style={{
        width: "100%", // Takes up the full width of its container
        maxWidth: "900px", // Caps the width at 900px
        minWidth: "600px",  // Minimum width of 600px
        height: "auto", // Keep the aspect ratio intact
        borderRadius: "10px",
        objectFit: "contain", // Ensures the image fits within the container
      }}
    />
  </Box>
</Box>

  );
};

export default DoLogin;