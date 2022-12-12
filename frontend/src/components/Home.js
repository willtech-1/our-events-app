import React, { useState, useEffect } from "react";
// api request functions
import { getAllEvents } from "./apiHome";
// import components
import Card from "./Card";
import Search from "./Search";

/*
Home component that displays events details to the user from upcoming events to most popular events
*/
const Home = () => {
  // popular events empty array as default
  const [popularEvents, setPopularEvents] = useState([]);
  // upcoming events
  const [upComingEvents, setUpComingEvents] = useState([]);
  // when request is made to the database show loading to the user
  const [isLoading, setIsLoading] = useState(true);
  // when there is an error
  const [error, setError] = useState(false);

  /*
  most popular events function that will sort events based on bthe number of ticketsSold
 the event that sold most number of tickets will be first and then the least will be last
  */
  const loadPopularEvents = () => {
    getAllEvents("ticketsSold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setPopularEvents(data);
      }
    });
  };

  /* 
  load events by arrival function fetches all the events and sort them according the time and date an event created
  Last created will be first and first created event will be last
  */
  const loadEventsByArrival = () => {
    getAllEvents("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setUpComingEvents(data);
      }
    });
  };

  // run these functions when component renders
  useEffect(() => {
    loadPopularEvents();
    loadEventsByArrival();
    setIsLoading(false);
  }, []);

 
  const bigText = {
   
  }

  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500">
        <div className="p-24">

          <h1 className="text-heading">
            Events Held in Durban{" "}
          </h1>
          <h1 className="text-heading" style={bigText}>
            International Convention Center{" "}
          </h1>
          <h2 className="text-p">
            Let's come together as one
          </h2>
        </div>
      </div>
      <br />
      {/* Search component */}
      <Search />

      <div className="container">
        <h1 className="mt-4 ml-2 text-2xl">Upcoming Events</h1>
        <div className="row">
          {isLoading ? (
            <div className="ml-4 mt-4">
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
            </div>
          ) : (
            upComingEvents.map((event, index) => (
              <Card event={event} key={index} />
            ))
          )}
          <br />
        </div>

        <h1 className="mt-4 ml-2 text-2xl">Most Popular Events</h1>
        <div className="row">
          {isLoading ? (
            <div className="ml-4 mt-4">
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
            </div>
          ) : (
            popularEvents.map((event, index) => (
              <Card event={event} key={index} />
            ))
          )}
          <br />
        </div>
      </div>
      <hr />
    </>
  );
};

export default Home;
