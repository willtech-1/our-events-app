import React, { useState } from "react";
// import backend localhost port
import { API } from "../config";
import { Link } from "react-router-dom";
//react icons
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

const Signup = () => {
  // contact form state
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  // eye password state
  const [isVisible, setIsVisible] = useState(false);

  // destructure form values
  const { name, email, password, error, success } = formValues;

  //handleChange function
  const handleChange = (e) => {
    setFormValues((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  //user signup function
  const signup = (user) => {
    return fetch(`/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //send data to backend as json
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handleSubmit function
  const handleSubmit = (e) => {
    // prevent page from being refreshed
    e.preventDefault();

    // envoke signup function
    signup({ name, email, password }).then((data) => {
      // if there is an error
      if (data.error) {
        setFormValues({ ...formValues, error: data.error, success: false });
      } else {
        // if successfully signed up update the state
        setFormValues({
          ...formValues,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
    
  };

  // show error function if there is an error alert and show the error to the user
  const showError = () => (
    <div className="flex justify-center">
      <div
        className="block w-2/4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
        style={{ display: error ? "" : "none" }}
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );
  // show success function 
  const showSuccess = () => (
    <div className="flex justify-center">
      <div
        className="block w-2/4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
        role="success"
        style={{ display: success ? "" : "none" }}
      >
        <p className="font-bold">Success</p>
        <p>New Account Created! <Link to="/signin" style={{textDecoration: "none"}}>Please signin</Link></p>
      </div>
    </div>
  );

  //eye style
  const eye = {
    position: "relative",
    bottom: "28px",
    left: "200px",
    cursor: "pointer",
  };

  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500 ...">
        Signup
      </div>
      <br />
      {showSuccess()}
      {showError()}
      <br />

      <h1 className="mt-4 text-2xl text-center">Sign Up</h1>
      <br />

      <div className="w-full flex justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={formValues.firstName}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formValues.email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
            {/* show/hide login password */}
            <div style={eye} onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
            <Link
              to="/signin"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              style={{ textDecoration: "none" }}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
     
      <br />
      <hr />
    </>
  );
};

export default Signup;
