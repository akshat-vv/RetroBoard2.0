import React, { useEffect, useState } from "react";
import UserView from "./UserView";
import AdminView from "./AdminView";
import { Box } from "@mui/material";
import { useUser } from "../context/UserContext";
import HelloImage from "../assets/images/hello.png";

const Dashboard = () => {
  const { user } = useUser();
  const token = localStorage.getItem('token');
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
