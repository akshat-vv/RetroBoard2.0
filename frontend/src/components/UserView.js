import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserView = () => {
  const [boardId, setBoardId] = useState('');
  const navigate = useNavigate();
  const user = useSelector(state=>state.user);
  
  const handleJoinBoard = (boardId)=>{
    navigate(`/${boardId}`);
  }

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center", // Horizontally center
      alignItems: "center", // Vertically center
      height: "100%",
      flexDirection: "column", // Align items in column
      padding: 2, // Add some padding to prevent elements from touching the edges
    }}
  >
    <Typography
      variant="h4"
      textAlign="center"
      color="text.primary"
      mb={3}
      sx={{
        fontSize: { xs: "2rem", sm: "3rem" }, // Adjust font size for responsiveness
      }}
    >
      Welcome {" "}
      <Box component="span" color="highlight.main">{user?.name?.toUpperCase()}</Box> {" "}
      to Retro Board {" "}
      <Box component="span" color="highlight.main">
        2.0
      </Box>
    </Typography>

    <Box
      sx={{
        display: "flex",
        gap: 2,
        marginTop: 2,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        width: { xs: "100%", sm: "auto" },
      }}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Enter Board Id"
        fullWidth
        onChange={(e) => setBoardId(e.target.value)}
        sx={{ mb: { xs: 2, sm: 0 } }} // Add margin at the bottom on small screens
      />
      <Button variant="contained" color="primary" onClick={() => handleJoinBoard(boardId)}>
        Join
      </Button>
    </Box>
  </Box>
  )
}

export default UserView