const express = require('express');
const router = express.Router();
const {getAllBoards, getBoardById, createBoard} = require('../controllers/boardControllers');
const {authorizeRole, authenticate} = require('../middlewares/authMiddleware');

router.post('/createBoard', authenticate , authorizeRole("admin"), createBoard);
router.get('/', authenticate,  getAllBoards);
router.get('/:boardId', authenticate, getBoardById);

module.exports = router;

