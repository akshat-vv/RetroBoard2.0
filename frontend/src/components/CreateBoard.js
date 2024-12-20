import React, { useState } from 'react';
import { Button, TextField, Box, Alert } from "@mui/material";
import { createBoard } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateBoard = () => {
  const [boardName, setBoardName] = useState("");
  const [columnInput, setColumnInput] = useState(""); // Raw column input
  const [message, setMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("error"); // Default severity
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleCreateBoard = async () => {
    const columnNames = columnInput.split(",").map(col => col.trim()).filter(col => col);

    if (!boardName || columnNames.length === 0) {
      setMessage("Please enter a valid board name and at least one column name.");
      setAlertSeverity("error");
      return;
    }

    const boardData = {
      name: boardName,
      columns: columnNames.map(name => ({ name, cards: [] }))
    };

    try {
      const response = await createBoard(boardData, token);

      if (response.error) {
        setMessage(response.error);
        setAlertSeverity("error");
      } else if (response.data && response.data._id) {
        setMessage("Board created successfully!");
        setAlertSeverity("success");
        navigate(`/${response.data._id}`);
      } else {
        setMessage("Unexpected response from the server.");
        setAlertSeverity("error");
      }
    } catch (err) {
      console.error("Error creating board:", err);
      setMessage("An unexpected error occurred. Please try again.");
      setAlertSeverity("error");
    }
  };

  return (
    <Box
      sx={{
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {message && <Alert severity={alertSeverity}>{message}</Alert>}
      <TextField
        id="boardName"
        label="Board Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
      />
      <TextField
        id="columnInput"
        label="Column Names"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter column names separated by commas"
        value={columnInput}
        onChange={(e) => setColumnInput(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleCreateBoard}
        disabled={!boardName || !columnInput}
      >
        Create New Board
      </Button>
    </Box>
  );
};

export default CreateBoard;
