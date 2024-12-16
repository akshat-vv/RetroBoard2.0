import React, { useEffect, useState } from "react";
import { getAllBoards } from "../services/api";
import { Box, Card, CardContent, Typography, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleJoinBoard = (boardId) => {
    navigate(`/${boardId}`);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await getAllBoards(token);
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
        setError("Failed to fetch boards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (boards?.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">No boards available.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", position: {sm : 'static', md: 'absolute'}, bottom:'120px' }}>
      <Typography variant="h4" gutterBottom>
        Latest Boards
      </Typography>
      <Grid container spacing={3}>
        {boards
          ?.slice(-6)
          .reverse()
          .map((board) => (
            <Grid item xs={12} sm={6} md={4} key={board._id}>
              <Card
                variant="outlined"
                sx={{
                  background: "rgba(233, 233, 233, 0.1)", // Semi-transparent white background
                  backdropFilter: "blur(10px)", // Blur effect
                  boxShadow: "0 8px 32px rgba(153, 154, 174, 0.37)", // Reflective shadow
                  borderRadius: "12px", // Smooth corners
                  border: "1px solid rgba(224, 224, 224, 0.18)", // Subtle border
                  color: "#ffffff", // White text for better visibility
                  padding: "16px",
                  cursor:'pointer'
                }}
                onClick={()=>{handleJoinBoard(board._id)}}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {board.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {board.columns.length} columns
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default AllBoards;
