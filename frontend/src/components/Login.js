import React, { use, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { login } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {addUser, removeUser} from '../store/slices/userSlice'

const Login = (props) => {
  const { changeModalContent, onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await login(email, password);
    setLoading(false);

    if (response.error) {
      setError(response.error);
      console.log(response.error);
    } else if (response) {
      const { data } = response;
      // setUser({
      //   id: data.id,
      //   name: data.name,
      //   role: data.role
      // });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.id);
      dispatch(addUser({
        id: data.id,
        name: data.name,
        role: data.role
      }))
      changeModalContent(null);
      onLogin();
      navigate('/');
    }
  };

  const handleSignup = () => {
    changeModalContent("signup");
  };

  return (
    <Box>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        textAlign="center"
      >
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error} {/* Show error message */}
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassowrd(e.target.value)}
        />

        {/* Button wrapped in Box to control the loader */}
        <Box sx={{ position: "relative", width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, p: 1 }}
            disabled={loading} // Disable the button while loading
          >
            Login
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              color="inherit"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </Box>
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2, p: 1 }}
          onClick={() => handleSignup()}
          color="highlight"
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Login;
