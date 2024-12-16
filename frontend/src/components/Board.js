import React, { useEffect, useState } from "react";
import { getBoard } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, CircularProgress, Box, Typography, Grid, Card, CardContent, Button, Avatar, Stack, Tooltip } from "@mui/material";
import DoLogin from "./DoLogin";
import NoBoardFound from "./NoBoardFound";
import AddCard from "./AddCard";
import DeleteCard from "./DeleteCard";
import LikeCard from "./LikeCard";

const Board = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [cardAdded, setCartAdded] = useState(false);
  const currentUserId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const onCardAdded = (columnId, newCard) => {
    // Update the board state to include the new card
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column) =>
        column._id === columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      );
      return { ...prevBoard, columns: updatedColumns };
    });
  };

  const onCardDeleted = (columnId, cardId) => {
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column) =>
        column._id === columnId
          ? { ...column, cards: column.cards.filter((card) => card._id !== cardId) }
          : column
      );
      console.log(updatedColumns);
      return { ...prevBoard, columns: updatedColumns };
    });
  };


  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBoard(boardId, token);
        setBoard(response.data);
      } catch (error) {
        setError("Error fetching the board. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId, token, cardAdded]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return <DoLogin />
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!board) {
    return <NoBoardFound/>
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
        {board.name?.toUpperCase()}
      </Typography>

      {/* Columns and Cards */}
      <Grid container spacing={3}>
        {board.columns.map((column) => (
          <Grid item xs={12} sm={6} md={4} key={column._id}>
            <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {column.name}
              </Typography>

              {/* Render Cards */}
              {column.cards.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No cards available
                </Typography>
              ) : (
                column.cards.map((card) => (
                  <Card key={card._id} sx={{ marginBottom: 2, borderRadius: "8px" }}>
                    <CardContent>
                      {/* Card Header */}
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar>{card.User[0]}</Avatar>
                        <Typography variant="subtitle1">{card.User}</Typography>
                      </Stack>

                      {/* Card Content */}
                      <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {card.content}
                      </Typography>

                      {/* Card Footer */}
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 2 }} justifyContent="space-between">
                        <LikeCard card={card} boardId={board._id} columnId={column._id}/>
                        {currentUserId === card.createdBy && <DeleteCard boardId={board._id} columnId={column._id} cardId={card._id} onCardDeleted={onCardDeleted}/>}
                      </Stack>
                    </CardContent>
                  </Card>
                ))
              )}
              <AddCard boardId={board._id} columnId={column._id} onCardAdded={onCardAdded}/>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Board;
