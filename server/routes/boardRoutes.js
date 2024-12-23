const express = require('express');
const router = express.Router();
const {getAllBoards, getBoardById, createBoard, deleteBoard } = require('../controllers/boardControllers');
const {authorizeRole, authenticate} = require('../middlewares/authMiddleware');

router.post('/createBoard', authenticate , authorizeRole("admin"), createBoard);
router.get('/', authenticate,  getAllBoards);
router.get('/:boardId', authenticate, getBoardById);
router.delete('/:boardId', authenticate, authorizeRole("admin"), deleteBoard);

module.exports = router;

