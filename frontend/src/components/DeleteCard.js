import React from 'react'
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteCard } from '../services/api';

const DeleteCard = (props) => {
    const { boardId, columnId, cardId } = props;
    const token = localStorage.getItem('token');

    const handleDeleteCard = async () => {
        const response = await deleteCard(boardId, columnId, cardId,token);
        if(response.status===200){
            // window.location.reload();
        }
    }
  return (
    <Button size="small" onClick={()=>handleDeleteCard()}>
    <DeleteForeverIcon color="primary" />
    </Button>
  )
}

export default DeleteCard