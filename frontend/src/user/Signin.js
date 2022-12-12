import React, { useState } from "react";
// import backend localhost port
import { API } from "../config";
import { Navigate, Link } from "react-router-dom";
import { BsFillEyeSlashFill, BsFillEyeFill}  from 'react-icons/bs';

const Signin = () => {
  // contact form state
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectUser: false,
    success: false
  });

  // eye password state
  const [isVisible, setIsVisible] = useState(false)

  const isAuthenticated = () => {
    // check if something exist on the localStorage
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      // get the token
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  };

  // destructure form values
  const { email, password, loading, error, redirectUser } = formValues;

  //destructure user
  const { user } = isAuthenticated();

  //handle change function
  const handleChange = (e) => {
    setFormValues((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  //authenticate user using jwt token
  const authenticate = (data, next) => {
    // check if something exist on the localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("token", JSON.stringify(data));
      next();
    }
  };

  //user signin function
  const signin = (user) => {
    return fetch(`/api/signin`, {
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

  // handleSubmit function that checks for user credentails when they try to sign in
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, error: false, loading: true });
    // envoke signin function
    signin({ email, password }).then((data) => {
      // if there is an error
      if (data.error) {
        setFormValues({ ...formValues, error: data.error, loading: false });
      } else {
        // if success successfully sign in
        authenticate(data, () => {
          setFormValues({ ...formValues, redirectUser: true });
        });
      }
    });
  };

  // showLoading to the user when request is being made
  const isLoading = () =>
    loading && (
      <div className="text-center">
        <div role="status">
          <svg
            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

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

  // navigate to the home page if user credentails are valid
  const redirectUsers = () => {
    if (redirectUser) {
      // if user is admin
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        // if the user is normal user
        return <Navigate to="/user/dashboard" />;
      }
    }

    // if user is authenticated then redirect them to home page
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  //eye style
  const eye = {
    position: "relative",
    bottom: "28px",
    left: "200px",
    cursor: "pointer"
  }

  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500 ...">
        Welcome back!
      </div>
      <br />

      {isLoading()}
      {showError()}
      {redirectUsers()}
      <br />

      <h1 className="mt-4 text-2xl text-center">Sign In</h1>
      <br />

      <div className="w-full flex justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
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
            <div style={eye} onClick={() => setIsVisible(!isVisible)}>{isVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              style={{ textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <hr />
    </>
  );
};

export default Signin;
