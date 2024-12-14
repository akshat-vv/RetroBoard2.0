const Board =  require('../models/board');

const createBoard = async(req,res)=>{
    try {
        const board = new Board(req.body);
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
  
const getAllBoards = async (req,res)=>{
    try{
        const boards = await Board.find();
        res.status(200).json(boards);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getBoardById = async (req,res)=>{
    try{
        const boardId = req.params.boardId;
        const board = await Board.findById(boardId);
        if(!board) return res.status(400).json({message: 'Board not found'});
        res.status(200).json(board);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {createBoard, getAllBoards, getBoardById};