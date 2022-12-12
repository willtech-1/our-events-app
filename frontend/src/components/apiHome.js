// backend server listening port
import { API } from "../config";
// query string package to pass params to the url
import queryString from "query-string";

/*
All Api Request Functions
*/

// get events function that fetches events from the database, limit is 8
export const getAllEvents = (sortBy) => {
  return fetch(`/api/events?sortBy=${sortBy}&order=desc&limit=8`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

//  getAllCategories function that fetches All the categories from the backend and populate them
export const getAllCategories = () => {
  return fetch(`/api/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

/*
get filtered events function that takes skip, limit & filter as arguments. 
Utilize the arguments when we use load more button
*/
export const getFilteredEvents = (skip, limit, filter = {}) => {
  const data = { skip, limit, filter };
  return fetch(`/api/events/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //send data to backend as json
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// search data request
export const list = (params) => {
  // utilize query string package to send query params
  const query = queryString.stringify(params);
  // console.log(query);
  return fetch(`/api/events/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
