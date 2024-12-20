import React from "react";
import { Typography, Box } from "@mui/material";
import NotFoundImage from '../assets/images/notFound.png';
const NoBoardFound = () => {
  return (
<Box sx={{ textAlign: "center", padding: 2 }}>
  <Typography 
    variant="h3" 
    color="secondary" 
    sx={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      marginBottom: 3, // Adds space between text and image
    }}
  >
    No Board Found
  </Typography>
  
  <Box 
    sx={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      overflow: 'hidden', // Prevents content overflow
      width: '100%', 
    }}
  >
    <img
      srcSet={`${NotFoundImage}?w=600&h=400&fit=crop&auto=format 600w, 
               ${NotFoundImage}?w=900&h=600&fit=crop&auto=format 900w, 
               ${NotFoundImage}?w=1200&h=800&fit=crop&auto=format 1200w`}
      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 900px"
      src={NotFoundImage} // Fallback image
      alt="Illustration showing that no board was found"
      loading="lazy" // Improves performance
      style={{
        width: "100%", // Adapts to the container width
        maxWidth: "900px", // Caps the image size at 900px
        height: "auto", // Maintains the aspect ratio
        borderRadius: "10px", // Adds rounded corners
      }}
    />
  </Box>
</Box>

  );
};

export default NoBoardFound;