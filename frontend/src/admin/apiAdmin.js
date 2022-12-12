// import backend localhost port
import { API } from "../config";

/* 
create category 
*/

export const createCategory = (userId, token, category) => {
  return fetch(`/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //send data to backend as json
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


// get All the categories from the backend and populate them
export const getAllCategories = () => {
  return fetch(`/api/categories`, {
    method: "GET"
  })
  .then(response  => {
    return response.json()
  }).catch(error => {
    console.log(error)
  })
}

// delete category which takes categoryId, userId and admin user token as params
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`/api/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};


/*
perform crud operations 
Event Admin Request API
*/

//create event
export const createEvent = (userId, token, event) => {
  return fetch(`/api/event/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body will be sent using form data
    body: event,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};



// get all events
export const getAllEvents = () => {
  return fetch(`/api/events?limit=100`, {
    method: "GET"
  })
  .then(response  => {
    return response.json()
  }).catch(error => {
    console.log(error)
  })
}

// get a single event
export const getSingleEvent = (eventId) => {
  return fetch(`/api/event/${eventId}`, {
    method: "GET"
  })
  .then(response  => {
    return response.json()
  }).catch(error => {
    console.log(error)
  })
}


// Update an event
export const updateEvent = (eventId, userId, token, event) => {
  return fetch(`/api/event/${eventId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body
    body: event
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete an event that takes eventId, userId and admin user token as an argument
export const deleteEvent = (eventId, userId, token ) => {
  return fetch(`/api/event/${eventId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};