import axios from "axios";

const API_URL = "https://retroboard2-0.onrender.com/api";

const login = async (email, password) => {
  const requestBody = {
    email,
    password,
  };

  try {
    const response = await axios.post(`${API_URL}/users/login`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return { error: "No response from the server" };
    } else {
      return { error: error.message };
    }
  }
};

const signup = async(userData) => {
  try{
    const response = await axios.post(`${API_URL}/users/signup`, userData,{
      headers:{
       "Content-Type": "application/json",
      }
    });
    console.log("AKSHAT",response);
    if(response.status === 201){
      return response
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

const createBoard = async (boardData, token) => {
  try{
    const response  = await axios.post(`${API_URL}/boards/createBoard`, boardData, {
      headers:{
        "Authorization": `Bearer ${token}` // Include the token
      }
    })
    console.log(response);
    if(response.status===201){
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

const getBoard = async (boardId, token)=>{
  try{
    const reponse = await axios.get(`${API_URL}/boards/${boardId}`,{
      headers:{
        "Authorization": `Bearer ${token}` // Include the token
      }
    });
    if(reponse.status===200){
      return reponse;
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

const getAllBoards = async (token) => {
  try{
    const response = await axios.get(`${API_URL}/boards`, {
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

const addCard = async(cardData, token)=>{
  try{
    const response = await axios.post(`${API_URL}/cards/add`, cardData, {
      headers: {
        "Authorization": `Bearer ${token}` // Include the token
      }
  });
  console.log(response);
  if(response.status===201){
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

const deleteCard = async (boardId, columnId, cardId, token) => {
  try{
    const response = await axios.delete(`${API_URL}/cards/delete/${boardId}/${columnId}/${cardId}`, {
      headers: {
        "Authorization": `Bearer ${token}` // Include the token
      }
    });
    console.log(response);
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

const addLike = async (boardId, columnId, cardId,userId, token) => {
  try {
    const response = await axios.patch(
      `${API_URL}/cards/like/${boardId}/${columnId}/${cardId}`,
      {
        cardId,
        userId
      }, // No body needed for this request, so pass an empty object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (error.response) {
      // Handle response errors
      return error.response.data;
    } else if (error.request) {
      // Handle no response from server
      return { error: "No response from the server" };
    } else {
      // Handle other errors
      return { error: error.message };
    }
  }
};


export { login, createBoard, getBoard, addCard, deleteCard, addLike, getAllBoards, signup };
