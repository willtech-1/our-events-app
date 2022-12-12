import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import components
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddEvent from "./admin/AddEvent";
import Events from "./components/Events";
import Footer from "./components/Footer"
import ManageEvents from "./admin/ManageEvents";
import UpdateEvent from "./admin/UpdateEvent";
import AdminDashboard from "./user/AdminDashboard";
import Dashboard from "./user/UserDashboard";
import Payment from "./components/Payment.js"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        
         {/* user protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/user/dashboard' exact element={<Dashboard />} /> 
          <Route path="/" exact element={<Home />} />
          <Route path="/events" exact element={<Events />} />
          <Route path="/payment" exact element={<Payment />} />
        </Route>
        
        {/* admin protected routes */}
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' exact element={<AdminDashboard />} />
          <Route path='/create/category' exact element={<AddCategory />} />
          <Route path='/create/event' exact element={<AddEvent />} />
          <Route path='/admin/events' exact element={<ManageEvents />} />
          <Route path='/admin/event/update/:eventId' exact element={<UpdateEvent />} />
          
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
