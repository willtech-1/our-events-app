// import react hooks and api home functions
import React, { useState, useEffect } from "react";
// api request functions
import { getFilteredEvents, getAllCategories } from "./apiHome";
import Card from "./Card";
// import choose category component
import ChooseCategory from "./ChooseCategory";
// image
import imageBcg from "../assets/bg.jpg";
import "./Events.css"

/*
Events component this is Where user will user the checkbox to choose which event categories they want to see
by default all events will be displayed and when user clicks on the checkbox only those checked categories will
appear when user unchecks all categories then all events will appear, at the bottom there will be a load button
if user wants to see more events
*/
const Events = () => {
  // categories
  const [categories, setCategories] = useState([]);
  // error
  const [error, setError] = useState(false);
  // limit of how many events are going to be displayed on screen
  const [limit, setLimit] = useState(8);
  // when user wants to load more events
  const [skip, setSkip] = useState(0);
  // filtered results of the events
  const [filteredResults, setFilteredResults] = useState(0);
  // will use events categories to filter through events
  const [myFilter, setMyFilter] = useState({
    filter: { category: [] },
  });
  // length of the events
  const [size, setSize] = useState(0);

  // load categories and set form data
  const getCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  // load filtered event function
  const loadFilteredEvents = (newFilter) => {
    getFilteredEvents(skip, limit, newFilter).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // update the state
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  // run these function when component re renders
  useEffect(() => {
    getCategories();
    loadFilteredEvents(skip, limit, myFilter.filter);
    // loadFilteredEvents()
  }, []);

  //handle filter function by category
  const handleFilter = (filter, filterBy) => {
    // console.log(filters, filtersBy)
    const newFilter = { ...myFilter };
    newFilter.filter[filterBy] = filter;
    // loadFilteredEvents from the backend
    loadFilteredEvents(myFilter.filter);
    setMyFilter(newFilter);
  };

  // load more events function
  const loadMoreEvents = () => {
    let toSkip = skip + limit;
    getFilteredEvents(toSkip, limit, myFilter.filter).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // updating the state
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };



  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500 ...">
        <div className="p-24">
          <h1 className="text-heading">Events specially curated for you</h1>
          <h2 className="text-p">Never miss out an event that matches your interest!</h2>
        </div>
      </div>

      <br />

      <h3 className="mb-4 ml-2 font-semibold text-gray-900 dark:text-white">
        Choose Category
      </h3>
      <div className="Crow">
        <ul className="w-48 text-sm ml-2 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <ChooseCategory
            categories={categories}
            handleFilter={(filter) => handleFilter(filter, "category")}
          />
        </ul>

        <img src={imageBcg} alt="background-image" className="image" />
      </div>
      <br />

      <h1 className="mt-4 ml-2 text-2xl">Events</h1>
      <div className="container">
        <div className="row">
          {!filteredResults ? (
            <div className="text-center ml-4">
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
          ) : (
            filteredResults.map((event, index) => (
              <Card event={event} key={index} />
            ))
          )}
          <br />
        </div>

        {/* load more button */}
        <hr />
        <br />
        <div>
          {/* conditionally rendering load more button based on the length on events */}
          {size > 0 && size >= limit && (
            <span
              onClick={loadMoreEvents}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 cursor-pointer"
            >
              Load More
            </span>
          )}
        </div>
      </div>
      <br />
    </>
  );
};

export default Events;
