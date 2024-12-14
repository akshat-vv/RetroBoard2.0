const express = require('express');
const router = express.Router();
const {getAllBoards, getBoardById, createBoard} = require('../controllers/boardControllers');

router.post('/createBoard', createBoard);
router.get('/', getAllBoards);
router.get('/:boardId', getBoardById);

module.exports = router;

