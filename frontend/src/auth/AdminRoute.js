import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// isAuthenitcated function
const isAuthenticated = () => {
  // check if something exist on the localStorage
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    // get the token from local storage
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

/* private route component that checks whether user is admin if role is 1 
if role is 0 user is will be registered as a normal user 
*/
const PrivateRoute = () => (
  isAuthenticated() && isAuthenticated().user.role === 1 ? <Outlet /> : <Navigate to="/signin" style={{ textDecoration: 'none' }} />
);

export default PrivateRoute;