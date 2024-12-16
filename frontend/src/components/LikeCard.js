import React, { useState } from "react";
import { Tooltip, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addLike } from "../services/api";

const LikeCard = ({ card, boardId, columnId }) => {
  const { _id } = card;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [likes, setLikes] = useState(card.likes);
  const [isLiking, setIsLiking] = useState(false); // Prevent multiple requests

  const handleAddLike = async () => {
    if (isLiking) return; // Prevent spamming clicks
    setIsLiking(true);

    try {
      const response = await addLike(boardId, columnId, _id, userId, token);
      if (response?.status === 200) {
        setLikes(response.data.card.likes); // Update likes count from server response
      } else {
        console.error("Failed to like the card:", response.statusText || response.error);
      }
    } catch (error) {
      console.error("Error liking the card:", error.message);
    } finally {
      setIsLiking(false); // Re-enable the button after request
    }
  };

  return (
    <Tooltip title={`Liked by ${likes} users`}>
      <Button
        variant="text"
        startIcon={<ThumbUpIcon />}
        size="small"
        sx={{ textTransform: "none" }}
        onClick={handleAddLike}
        disabled={isLiking} // Disable button while liking
      >
        {likes}
      </Button>
    </Tooltip>
  );
};

export default LikeCard;
