import axios from "axios";

const API_URL = "https://retroboard2-0.onrender.com/api";

// Utility function for making API requests
const makeRequest = async (method, url, data = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
      headers,
    });

    if ([200, 201].includes(response.status)) {
      return response; // Return the full response for successful cases
    }
  } catch (error) {
    if (error.response) {
      return error.response.data; // Return error response from server
    } else if (error.request) {
      return { error: "No response from the server" }; // Handle no response
    } else {
      return { error: error.message }; // Handle other errors
    }
  }
};

// Define API functions
const login = async (email, password) => {
  return await makeRequest("post", "/users/login", { email, password });
};

const signup = async (userData) => {
  return await makeRequest("post", "/users/signup", userData);
};

const createBoard = async (boardData, token) => {
  return await makeRequest("post", "/boards/createBoard", boardData, token);
};

const getBoard = async (boardId, token) => {
  return await makeRequest("get", `/boards/${boardId}`, null, token);
};

const getAllBoards = async (token) => {
  return await makeRequest("get", "/boards", null, token);
};

const addCard = async (cardData, token) => {
  return await makeRequest("post", "/cards/add", cardData, token);
};

const deleteCard = async (boardId, columnId, cardId, token) => {
  try{
    const response = await axios.delete(`${API_URL}/cards/delete/${boardId}/${columnId}/${cardId}`, {
      headers: {
        "Authorization": `Bearer ${token}` // Include the token
      }
    });
    if(response.status===200){
      return response;
    }
  }catch(error){
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: "No response from the server" };
    } else {
      return { error: error.message };
    }
  }
}

const addLike = async (boardId, columnId, cardId, userId, token) => {
  return await makeRequest(
    "patch",
    `/cards/like/${boardId}/${columnId}/${cardId}`,
    { cardId, userId },
    token
  );
};

export { login, signup, createBoard, getBoard, getAllBoards, addCard, deleteCard, addLike };
