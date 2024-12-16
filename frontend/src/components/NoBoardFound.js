import React from "react";
import { Typography, Box } from "@mui/material";
import NotFoundImage from '../assets/images/notFound.png';
const NoBoardFound = () => {
  return (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <Typography variant="h3" color="secondary" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        No Board Found{" "}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src={NotFoundImage}
          alt="No Board Found"
          style={{
            width: "900px",  // You can adjust the size as needed
            display: "block",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        />
      </Box>
    </Box>
  );
};

export default NoBoardFound;