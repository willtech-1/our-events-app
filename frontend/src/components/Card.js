import React, { useState } from "react";
// import backend localhost port
import { API } from "../config";
import { Link } from "react-router-dom"
import "./Card.css";


// Card compnent taking in event as a prop
const Card = ({ event }) => {


  return (
    <div className="card border-0 col-md-3">
      <div className="card-body">
        <img
          src={`/api/event/photo/${event._id}`}
          alt="event image"
          style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "4px" }}
        />
        <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs mt-2">
          {event.title}
        </span>
        <div className="mt-2 mb-2">
          <Link to="/payment" style={{ textDecoration: 'none' }} className="nline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy Ticket</Link>
           {" "}
        </div>
        {/* set description words to 100 */}
        <p className="text-sm">{event.description.substring(0, 100)}</p>
        <div className="mt-3 flex items-center">
          <span className="text-sm font-semibold">R</span>&nbsp;
          <span className="font-bold text-xl">{event.ticketPrice}</span>
          &nbsp;
          <span className="text-sm font-semibold">00</span>
        </div>

        <div className="p-4 border-t border-b text-xs text-gray-700">
          <span className="flex items-center mb-1">
            <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>{" "}
            Duration: {event.duration}
          </span>
          <span className="flex items-center">
            <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>{" "}
            Date: {event.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
