import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  FormHelperText,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const Login = (props) => {
  const { changeModalContent, onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErroMessages] = useState({
    email: "",
    password: "",
  })
  // const [validationMessage, setValidationMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await login(email, password);
      setLoading(false);

      if (
        response &&
        (response.status === 200 || response.status === 201) &&
        response.data
      ) {
        const { token, role, name, id } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);
        dispatch(addUser({ id, name, role }));
        changeModalContent(null);
        onLogin();
        navigate("/");
      } else {
        if (response?.error) {
          setError(response.error);
        }
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSignup = () => {
    changeModalContent("signup");
  };

  const validate = (field)=>{
    console.log("validating");
    if(field === "email"){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        setErroMessages({
          ...errorMessages,
          email: "Invalid email format"});
      } else {
        setErroMessages({
          ...errorMessages,
          email: ""
        })
      }
    }
  }

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
          margin="normal"
          required={true}
          type="email"
          name="email"
          value={email}
          fullWidth
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          fullWidth
          margin="normal"
          required={true}
          value={password}
          type="password"
          onChange={(e)=>setPassowrd(e.target.value)}
        />

        {/* Button wrapped in Box to control the loader */}
        <Box sx={{ position: "relative", width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, p: 1 }}
            disabled={loading || !email || !password} // Disable the button while loading
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
