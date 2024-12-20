import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";
import { signup } from "../services/api";

const Signup = (props) => {
  const { changeModalContent } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    const signupData = {
      name,
      email,
      password,
      role,
    };

    setLoading(true);

    try {
      const response = await signup(signupData);
      setLoading(false);
      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        alert("Signup successful! Please log in to continue.");
        changeModalContent("login");
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      setLoading(false);
      // Handle API errors or network issues
      console.error("Error during signup:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      alert(errorMessage); // Display error message to the user
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ marginBottom: 2 }}
      >
        Signup
      </Typography>
      <form onSubmit={handleSignup}>
        <TextField
          id="name"
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ position: "relative", width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, p: 1 }}
            disabled={!name || !email || !password || !role}
          >
            Sign Up
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
          color="highlight"
          sx={{ marginTop: 2, p: 1 }}
          onClick={() => changeModalContent("login")}
        >
          Already Have an account ? Login
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
