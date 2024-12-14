const express = require('express');
const router = express.Router();
const {likeCard, deleteCard, addCardToColumn} = require('../controllers/cardControllers');

router.post('/add', addCardToColumn);
router.delete('/delete/:boardId/:columnId/:cardId', deleteCard);
router.patch('/like/:boardId/:columnId/:cardId', likeCard);

module.exports = router;