// import EventModel
const Event = require("../models/event");
// sending form data to be able to upload an event image we utilize formidable
const formidable = require("formidable");
// import loadash package
const _ = require("lodash");
// import fs module
const fs = require("fs");

//create a new Event
exports.create = (req, res) => {
  // form data will be available on the new IncomingForm()
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  // parse form data
  form.parse(req, (err, fields, files) => {
    // if there is an error while uploading an image
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded" + err,
      });
    }

    // desctructure fields
    const { title, date, description, ticketPrice, duration, category } =
      fields;
    //
    // check for all fields if they exist
    if (
      !title ||
      !date ||
      !description ||
      !ticketPrice ||
      !duration ||
      !category
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // is there is no error then we create a new event
    let event = new Event(fields);
    // handling image files from the client side
    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      // access the file system
      event.photo.data = fs.readFileSync(files.photo.filepath);
      event.photo.contentType = files.photo.mimetype;
    }

    // save event to the database
    event.save((err, result) => {
      // if an occured while save the event
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      // if successfull
      res.status(200).json(result);
    });
  });
};

// readEvent
exports.readEvent = (req, res) => {
  // initially set the photo to undefined because size might cause performance issues
  req.event.photo = undefined;
  return res.json(req.event);
};

// eventById middleware
exports.eventById = (req, res, next, id) => {
  Event.findById(id).exec((err, event) => {
    // there is an error or no event
    if (err || !event) {
      return res.status(400).json({
        error: "Event not found",
      });
    }
    // if event is found and exist then populate the event in the request object
    req.event = event;
    next();
  });
};

// remove event
exports.removeEvent = (req, res) => {
  let event = req.event;
  // remove event
  event.remove((err, deletedEvent) => {
    // if an occured while save the event
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    // if successfully deleted
    res.status(200).json({ message: "Event deleted successfully!" });
  });
};

// update Event
exports.updateEvent = (req, res) => {
  // form data will be available on the new IncomingForm()
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  // parse form data
  form.parse(req, (err, fields, files) => {
    // if there is an error while uploading an image
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded" + err,
      });
    }

    // is there is no error then we create a new event
    let event = req.event;
    // utilize loadsh extend method to replace the existing information with the new information
    event = _.extend(event, fields);
    // handling image files from the client side
    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }

      event.photo.data = fs.readFileSync(files.photo.filepath);
      event.photo.contentType = files.photo.mimetype;
    }

    // save event to the database
    event.save((err, result) => {
      // if an occured while save the event
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      // if successfull
      res.status(200).json({ result, message: "Event updated sucessfully!" });
    });
  });
};

/*
UPCOMING EVENTS 
upcoming events = events?sortBy=createdAt&order=desc&limit=8
*/

/*
MOST POPULAR EVENTS
most popular = events?sortBy=ticketsSold&order=desc&limit=8 
*/

// if no params sent then all events are returned
exports.getEvents = (req, res) => {
  // grab order from the request query or else return events in an ascending order
  let order = req.query.order ? req.query.order : "asc";
  // grab sortBy from the request query or else sort events based on the id
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  // grab limit from the request query if no query then return 8 as a limit
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;

  // get everything from the database except event image because of the space I will make a seperate request later to get those image
  Event.find()
    .select("-photo")
    .populate("category")
    // to sort we need array of arrays
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, events) => {
      // if there is an error
      if (err) {
        return res.status(400).json({
          error: "Events not found",
        });
      }

      // if successful
      res.send(events);
    });
};

// list Categories
exports.listEventCategories = (req, res) => {
  // mongodb distinct method to category
  Event.distinct("category", {}, (err, categories) => {
    // if there is an error
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    // if successful
    res.send(categories);
  });
};


// LIST EVENTS BY SEARCH
/* 
 * we will implement Event search in react frontend
 * we will show categories in checkbox 
 * as the user clicks on those checkbox
 * we will make api request and show the event to users based on what the user wants
*/
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filter) {
    if (req.body.filter[key].length > 0) {
      // 
      findArgs[key] = req.body.filter[key];
    }
  }

  // find event search based on the arguments
  Event.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      // if there is an error
      if (err) {
        return res.status(400).json({
          error: "Event not found",
        });
      }
      // if successful send events and how many events
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.event.photo.data) {
    // use set() method because photo is not a json response
    res.set("Content-Type", req.event.photo.contentType);
    return res.send(req.event.photo.data);
  }
  next();
};



exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    // mongoose regular expression & handle words insensitivity
    query.title = { $regex: req.query.search, $options: "i" };
    // then assign category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Event.find(query, (err, events) => {
      if (err) {
        return res.status(200).json({
          error: err,
        });
      }
      res.json(events);
    }).select("-photo");
  }
};
