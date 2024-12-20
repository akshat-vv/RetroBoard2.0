import React, { useEffect, useState } from "react";
import UserView from "./UserView";
import AdminView from "./AdminView";
import { Box } from "@mui/material";
import HelloImage from "../assets/images/hello.png";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  return (
    <>
      {user?.role === "admin" && token ? <AdminView /> : <UserView />}
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "0 16px", md: "0" }, // Optional: add padding for smaller screens
          }}
        >
          <img
            srcSet={`${HelloImage}?w=400&h=400&fit=crop&auto=format 400w, ${HelloImage}?w=800&h=800&fit=crop&auto=format 800w, ${HelloImage}?w=1200&h=1200&fit=crop&auto=format 1200w`}
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 700px"
            src={HelloImage} 
            alt="Greeting image with a friendly character" 
            loading="lazy"
            style={{
              width: "100%", // Takes up the full width of its container
              maxWidth: "700px", // Caps the width at 700px
              height: "auto", // Keep the aspect ratio
            }}
          />
        </Box>
    </>
  );
};

export default Dashboard;
