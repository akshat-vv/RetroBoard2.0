import { Box, Button, TextField, Typography, Modal, Alert } from "@mui/material";
import React, { useState } from "react";
import { addCard } from "../services/api";

const AddCard = (props) => {
  const { boardId, columnId} = props;
  const [cardContent, setCardContent] = useState("");
  const [error, setError] = useState(false);
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  const [open, setOpen] = useState(false);

  const handleAddCard = async ()=> {
    if(cardContent.length===0){
      setError(true);
      return;
    }

    const cardData = {
        boardId,
        columnId,
        cardData: {
            User:name,
            content: cardContent,
        }
    }
    const response  = await addCard(cardData, token);

    if(response.status===201){
      window.location.reload();
      setOpen(false);
    }
  }

  const handleOpen = ()=>{
    setOpen(true);
  }
  
  const handleClose=()=>{
    setOpen(false);
  }

  return (
    <Box>
      <Button variant="outlined" color="primary" fullWidth onClick={()=>handleOpen()}>
        Add Card
      </Button>
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
          <Typography variant="h6" textAlign="center">
            Add your Comments
          </Typography>
          {error && <Alert severity="info">Please add your comments</Alert>}
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            fullWidth
            defaultValue=""
            placeholder="Enter your comments"
            variant="outlined"
            margin="normal"
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
          />
          <Button variant="contained" fullWidth margin="normal" sx={{ mt: 1 }} onClick={()=>handleAddCard()}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
    
  );
};

export default AddCard;
