import React, { useState } from "react";
// import methods
import { createCategory } from "./apiAdmin";
import { isAuthenticated } from "../auth/authenticate";
import { Link } from "react-router-dom";
import AllCategories from "./AllCategories";

// Add Event category component
const AddCategory = () => {
  // state
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from the localStorage
  const { user, token } = isAuthenticated();

  // handleChange function
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // make an api call
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setSuccess(true);
        setError(false);
        //referesh page
        window.location.reload();
      }
    });
  };

  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500 ...">
        <div className="p-24">
          <h1 className="text-[#FDFDFD] text-4xl font-bold mt-10">
            Add Category
          </h1>
          <h2 className="text-p">
            Create a new category
          </h2>
        </div>
      </div>
      <br />
      {success && (
        <div className="flex justify-center">
          <div
            className="block w-2/4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
            role="success"
          >
            <p className="text-lg font-bold text-center">Success!</p>
            <p className="text-md text-center">
              <b>{name}</b> Category created
            </p>
          </div>
        </div>
      )}
      {error && (
        <div className="flex justify-center">
          <div
            className="block w-2/4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >
            <p className="text-lg font-bold text-center">Error!</p>
            <p className="text-md text-center">
              <b>({name})</b> Category name should be unique
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <p className="mt-4 text-2xl text-center">Add Category</p>
        <br />
        <div className="flex justify-center">
          <input
            className="block w-2/4 p-3 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-center"
            placeholder="Add category"
            required
            onChange={handleChange}
            value={name}
          />{" "}
          <button
            type="submit"
            className="text-white relative left-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </div>
      </form>
      {/* show all Categories component */}
      <AllCategories />
      <div className="mt-6 p-2">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
        >
          Back
        </Link>
      </div>
      <br />
      <hr />
    </>
  );
};

export default AddCategory;
