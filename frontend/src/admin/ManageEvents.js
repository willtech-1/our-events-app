// import react hook
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/authenticate";
import { Link } from "react-router-dom";
// import api request functions
import { getAllEvents, deleteEvent } from "./apiAdmin";
import "./Table.css";

/*
 Manage events component where admin user will perform all CRUD operations
*/ 
const ManageEvents = () => {
  // store the events state
  const [getEvents, setGetEvents] = useState([]);

  // destructure values from isAuthenticated
  const { user, token } = isAuthenticated();

  // get all events function
  const fetchEvents = () => {
    getAllEvents().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // update the state
        setGetEvents(data);
      }
    });
  };

  // remove event function that takes an event id to remove an event
    const removeEvent = (eventId) => {
    deleteEvent(eventId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // update the state
        fetchEvents();
      }
    });
  };

  // get events when the component renders
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <div className="h-72 bg-gradient-to-r from-cyan-500 to-lightblue-500 ...">
        <div className="p-24">
          <h1 className="text-[#FDFDFD] text-4xl font-bold mt-10">
            Manage Events Upcoming Events
          </h1>
          <h2 className="text-p">
            List of All Events
          </h2>
        </div>
      </div>
      <br />
      <h1 className="mt-4 ml-16 mb-2 text-2xl">{getEvents.length} Events</h1>

      <table>
        <thead>
          <tr>
            <th className="th-cell-left">Event Name</th>
            <th>Update Event</th>
            <th className="th-cell-right">Delete Event</th>
          </tr>
        </thead>
        <tbody>
          {getEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.title}</td>
              <td>
                <Link to={`/admin/event/update/${event._id}`}>Update</Link>
              </td>
              <td onClick={() => removeEvent(event._id)}>
                <Link>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 p-2">
        <Link
          to="/events"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default ManageEvents;
