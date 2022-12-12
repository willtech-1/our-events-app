// import react hooks
import React, { useState, useEffect } from "react";
// api request functions
import { list, getAllCategories } from "./apiHome";
// card component
import Card from "./Card";

/* 
Search functional Component that will return searched results, search by user when user type matching event 
title string on the search bar 
*/

const Search = () => {
  // state
  const [data, setData] = useState({
    // list of categories
    categories: [],
    // single categories
    category: "",
    // input searched string
    search: "",
    // searched results
    results: [],
    searched: false,
  });

  // destructure state values
  const { categories, category, search, results, searched } = data;

  // fetch all categories function
  const loadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        // console.log(data.error);
      } else {
        // update the state 
        setData({ ...data, categories: data });
      }
    });
  };

  // handleSubmit
  const handleSearch = e => {
    // prevent default
    e.preventDefault();
   // if there is a string on a search bar 
    if(search){
      // then send searched params to the backend if nothing searched then undefined, also send the category
      list({search: search || undefined, category: category})
      .then(response => {
          if(response.error){
              // console.log(response.error)
          }else{
            // update the state
              setData({...data, results: response, searched: true})
          }
      })
  }
  }

  // higher order handleChange function
  const handleChange = (name) => (event) => {
    // update the state
    setData({...data, [name]: event.target.value, searched: false})
  };

  // show events found message to the user
  const searchMessage = (searched, results) => {
    if(searched && results.length === 1){
      return `Found ${results.length} event`
    }
    if(searched && results.length > 1){
      return `Found ${results.length} events`
    }
    if(searched && results.length < 1){
      return `No events found`
    }
  }

  /*
  searched events function that takes results as an empty array default parameter if no events searched were found
  if there were events found then display them using card component
  */  
  const searchedEvents = (results = []) => {
    return (
      <>
         {/* show message to the user how many event were found */}
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
            {results.map((event, index) => (
                <Card key={index} event={event} />
            ))}
        </div>
      </>
    )
  }

  
  // load categories when ever component renders
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <div className="mr-2 ml-2">
        <form onSubmit={handleSearch}>
          <div className="flex">
            <select
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
              onChange={handleChange("category")}
            >
              {/* option select dropdown */}
              <option value="All">Category</option>
              {categories.map((category, index) => (
              <option
               key={index} 
               value={category._id}>
                {category.name}
              </option>
              ))}
              
            </select>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                onChange={handleChange("search")}
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      
      </div>

      {/* searched events */}
        <div className="container">
            {searchedEvents(results)}
        </div>
      
    </>
  );
};

export default Search;
