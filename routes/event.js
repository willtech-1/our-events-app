// import modules
const express = require("express");
const router = express.Router();
// import controllers
const {
  create,
  eventById,
  photo,
  readEvent,
  removeEvent,
  updateEvent,
  getEvents,
  listEventCategories,
  listBySearch,
  listSearch
} = require("../controllers/event");
// import user middlewares
const {
  requireSignin,
  isAuth,
  isAdmin,

} = require("../controllers/userControllers");
const { userById } = require("../controllers/user");

// routes
//create event route
router.post("/event/create/:userId", requireSignin, isAuth, isAdmin, create);
// get the and read it
router.get("/event/:eventId", readEvent);
// admin delete event
router.delete(
  "/event/:eventId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  removeEvent
);
router.put(
  "/event/:eventId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateEvent
);
// get most popular and upcoming events route
router.get("/events", getEvents);
router.get("/events/categories", listEventCategories);
// use post to search for event explain 47. video
router.post('/events/by/search', listBySearch)
//photo route
router.get("/event/photo/:eventId", photo)
router.get("/events/search", listSearch)



//router.param to check the parameter everytime there is 'userId'
router.param("userId", userById);
//router.param to check the parameter everytime there is 'eventId'
router.param("eventId", eventById);

// export router
module.exports = router;
