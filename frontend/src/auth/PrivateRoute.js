import React from "react";
import { Outlet, Navigate } from "react-router-dom";


const isAuthenticated = () => {
  // check if something exist on the localStorage
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

// private route component that checks if user has the access or not
const PrivateRoute = () => (
  isAuthenticated() ? <Outlet /> : <Navigate to="/signin" style={{ textDecoration: 'none' }} />
);

export default PrivateRoute;