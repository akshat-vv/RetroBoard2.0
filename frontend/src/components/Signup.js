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
} from "@mui/material";
import {signup} from '../services/api'

const Signup = (props) => {
  const { changeModalContent } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    
    // Prepare signup data
    const signupData = {
      name,
      email,
      password,
      role,
    };
  
    try {
      const response = await signup(signupData);
      console.log("VIJAY", response);
      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        alert("Signup successful! Please log in to continue.");
        changeModalContent("login");
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      // Handle API errors or network issues
      console.error("Error during signup:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMessage); // Display error message to the user
    }
  };
  

  return (
    <Box
    >
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
        {/* Name Field */}
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Email Field */}
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
        {/* Password Field */}
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
        {/* Role Dropdown */}
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
        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, p:1 }}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2, p:1  }}
        >
          Already Have an account ? Login
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
