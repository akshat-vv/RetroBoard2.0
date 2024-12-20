import React, { useEffect, useState } from "react";
import UserView from "./UserView";
import AdminView from "./AdminView";
import { Box } from "@mui/material";
import HelloImage from "../assets/images/hello.png";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const user = useSelector(state=>state.user);
  return (
    <>
      {user?.role === "admin" && token ? <AdminView /> : <UserView />}
      <Box sx={{ textAlign: "center", marginTop: 2, display: { xs:'none', md:'block'} }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={HelloImage}
            alt="Hello Image"
            style={{
              width: "100%", // Takes up the full width of its container
              maxWidth: "700px", // Caps the width at 900px
              height: "auto", // Keep the aspect ratio
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
