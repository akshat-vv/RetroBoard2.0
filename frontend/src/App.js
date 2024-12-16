import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Board from "./components/Board";

function App() {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <NavigationBar />
      <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/:boardId" element={<Board />}/>
        </Routes>
    </Container>
  );
}

export default App;
