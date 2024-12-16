import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useUser } from '../context/UserContext';
import AllBoards from './AllBoards';
import CreateBoard from './CreateBoard';

const AdminView = () => {
  const {user} = useUser();
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "start", // Horizontally center
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
      Welcome  {" "}
      <Box component="span" color="highlight.main">
      {user?.name?.toUpperCase()}
      </Box>
    </Typography>

    <Box
      sx={{
        display: "flex",
        gap: 2,
        marginTop: 2,
        flexDirection: 'column',
        alignItems: "center",
        width: { xs: "100%", sm: "100%" },
      }}
    >
    <CreateBoard/>
    <AllBoards/>
    </Box>
  </Box>
  )
}

export default AdminView