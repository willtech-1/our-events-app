import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const isAuthenticated = () => {
  // check if something exist on the localStorage
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    // get token from local storage
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

// Admin Dashboard component
const AdminDashboard = () => {
  // destructure values from isAuthenticated
  const {user: { name, email, role }} = isAuthenticated();
  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500 ...">
      <div className="p-24">
        <h1 className="text-[#FDFDFD] text-4xl font-bold mt-2">Welcome, {name}!</h1>
        <h2 className="text-[#FDFDFD] text-2xl font-light mt-4">Admin user</h2>
      </div>
      </div>

      <div className="p-3">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-4">
          <div className="flex flex-col items-center pb-10">
            <CgProfile className="w-24 h-24 mb-3 rounded-full shadow-lg text-gray-400" />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {email}
            </span>
            <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              {role === 1 ? "Admin User" : "Registered User"}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <Link
                to="/create/category"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Add Category
              </Link>
              <Link
                to="/create/event"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Create Event
              </Link>
            </div>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <Link
                to="/admin/events"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Manage Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
