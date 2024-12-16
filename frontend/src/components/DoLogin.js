import React from "react";
import { Typography, Box } from "@mui/material";
import LoginImage from '../assets/images/login.png';
const DoLogin = () => {
  return (
    <Box sx={{ textAlign: "center", padding: 2, overflow:'hidden' }}>
      <Typography variant="h3" color="secondary" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        Login to Access the Board{" "}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", objectFit:'contain'}}>
        <img
          src={LoginImage}
          alt="No Board Found"
          style={{
            width: "100%",
            maxWidth: "900px",
            minWidth: "600px",  // You can adjust the size as needed
            display: "block",
            margin: "0 auto",
            borderRadius: "10px"
          }}
        />
      </Box>
    </Box>
  );
};

export default DoLogin;