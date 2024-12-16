import React from 'react'
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteCard } from '../services/api';

const DeleteCard = (props) => {
    const { boardId, columnId, cardId, onCardDeleted } = props;
    const token = localStorage.getItem('token');

    const handleDeleteCard = async () => {
        const response = await deleteCard(boardId, columnId, cardId,token);
        if(response.status===200){
          onCardDeleted(columnId, cardId);
        }
    }
  return (
    <Button size="small" onClick={()=>handleDeleteCard()}>
    <DeleteForeverIcon color="primary" />
    </Button>
  )
}

export default DeleteCard