const Board = require("../models/board");

const addCardToColumn = async (req, res) => {
  const { boardId, columnId, cardData } = req.body;
  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const column = board.columns.id(columnId);

    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }
    // Add new card to the column
    column.cards.push(cardData);
    await board.save();

    res
      .status(201)
      .json({ message: "Card added successfully", card: cardData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCard = async (req, res) => {
  const { boardId, columnId, cardId } = req.params;

  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ error: "Board not found" });

    const column = board.columns.id(columnId);
    if (!column) return res.status(404).json({ error: "Column not found" });

    // Find the card index in the column's cards array
    const cardIndex = column.cards.findIndex(card => card._id.toString() === cardId.toString());
    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found in this column" });
    }

    // Remove the card from the array
    column.cards.splice(cardIndex, 1);
    await board.save(); // Save the updated board document

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error during card deletion:", error);
    res.status(500).json({ error: error.message });
  }
};



const likeCard = async (req, res) => {
  const { cardId, userId } = req.body;
  const {boardId, columnId} = req.params;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    const column = board.columns.id(columnId);

    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    const card = column.cards.id(cardId);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    if (!card.likedBy.includes(userId)) {
      // Add like
      card.likedBy.push(userId);
      card.likes += 1;
      await board.save();
      // await card.save();
      return res.status(200).json({ message: "Card liked", card });
    } else {
      // Remove like
      await unlikeCard(boardId, columnId, cardId, userId, res);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unlikeCard = async (boardId,columnId, cardId, userId, res) => {
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    const column = board.columns.id(columnId);

    if (!column) {
      return res.status(404).json({ error: "Column not found" });
    }

    const card = column.cards.id(cardId);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    const userIndex = card.likedBy.indexOf(userId);
    if (userIndex !== -1) {
      // Remove user from likedBy array
      card.likedBy.splice(userIndex, 1);
      card.likes -= 1;
      await board.save();
      return res.status(200).json({ message: "Like removed", card });
    } else {
      return res.status(400).json({ error: "User has not liked this card" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addCardToColumn, deleteCard, likeCard };
