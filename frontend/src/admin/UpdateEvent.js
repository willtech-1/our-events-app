// import react Hook
import React, { useState, useEffect } from "react";
// api request function
import { getSingleEvent, getAllCategories, updateEvent } from "./apiAdmin";
import { isAuthenticated } from "../auth/authenticate";
// react router dom hooks
import { Link, useParams, Navigate } from "react-router-dom";


//  Update and event componet 

const UpdateEvent = () => {
  // state
  const [values, setValues] = useState({
    title: "",
    date: "",
    description: "",
    ticketPrice: "",
    duration: "",
    categories: [],
    category: "",
    photo: "",
    ticketsSold: 0,
    loading: false,
    error: false,
    createdEvent: "",
    redirectAdmin: false,
    formData: "",
  });

  // utilized useParams hook to get an event id from the params
  const { eventId } = useParams();


  // destructure values
  const {
    title,
    date,
    description,
    ticketPrice,
    duration,
    categories,
    loading,
    error,
    createdEvent,
    redirectAdmin,
    formData,
  } = values;

  // destructure user and token from the localStorage
  const { user, token } = isAuthenticated();

  // get the event function
  const loadData = (eventId) => {
    getSingleEvent(eventId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        // console.log(data)
        setValues({
          ...values,
          title: data.title,
          date: data.date,
          ticketPrice: data.ticketPrice,
          duration: data.duration,
          description: data.description,
          category: data.category._id,
          formData: new FormData(),
        });

        // and load categories
        loadCategories();
      }
    });
  };

  // load categories and set form data
  const loadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the categories and make form data available for us use
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  // make use of form data as soon as component re renders
  useEffect(() => {
    loadData(eventId);
  }, []);

  // higher order function
  const handleChange = (name) => (event) => {
    // first check if name or file
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // clear error
    setValues({ ...values, error: "", loading: true });

    updateEvent(eventId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // set state to its default values
        setValues({
          ...values,
          title: "",
          date: "",
          description: "",
          ticketPrice: "",
          duration: "",
          photo: "",
          loading: false,
          createdEvent: data.title,
          redirectAdmin: true,
          error: false,
        });
      }
    });
  };

  // show error function
  const showError = () => (
    <div className="flex justify-center">
      <div
        style={{ display: error ? "" : "none" }}
        className="block w-2/4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
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
        style={{ display: createdEvent ? "" : "none" }}
        className="block w-2/4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
        role="success"
      >
        <p className="font-bold">Success</p>
        <p>{createdEvent} Event successfully updated</p>
      </div>
    </div>
  );

  //showLoading
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

  // navigate to the home page
  const redirectUsers = () => {
    if (redirectAdmin) {
      if (!error) {
        return <Navigate to="/" />;
      }
    }
  };

  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500 ...">
        <div className="p-24">
          <h1 className="text-[#FDFDFD] text-4xl font-bold mt-10">
            Update Event
          </h1>
        </div>
      </div>
      <br />

      {isLoading()}
      {showSuccess()}
      {showError()}
      {redirectUsers()}

      <br />
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              name="photo"
              onChange={handleChange("photo")}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              SVG, PNG, JPG or GIF (MAX. 1MB).
            </p>
          </div>

          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Event Title
            </label>
            <input
              type="text"
              onChange={handleChange("title")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              value={title}
              name="title"
            />
          </div>

          <div className="mt-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Event Description
            </label>

            <textarea
              rows="4"
              onChange={handleChange("description")}
              value={description}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type event description..."
            ></textarea>
          </div>

          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ticket Price
            </label>
            <input
              type="number"
              onChange={handleChange("ticketPrice")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Price"
              value={ticketPrice}
            />
          </div>

          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select
              onChange={handleChange("category")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>--Please Select--</option>
              {categories &&
                categories.map((category, index) => (
                  <option value={category._id} key={index}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Duration
            </label>
            <input
              type="text"
              onChange={handleChange("duration")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Duration"
              value={duration}
              name="duration"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              E.g From 15:00 to 17:00
            </p>
          </div>

          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date
            </label>
            <input
              type="text"
              onChange={handleChange("date")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Date"
              value={date}
              name="date"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              E.g Dec 12 2022
            </p>
          </div>
          <br />

          <div className="mb-2">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
              Update Event
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 p-2">
        <Link
          to="/admin/events"
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

export default UpdateEvent;
