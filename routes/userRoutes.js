// import modules
const express = require("express");
const router = express.Router();
//import controllers
const {
  signup,
  signin,
  requireSignin,
  signout
} = require("../controllers/userControllers");

//routes
router.post("/signup", signup).post("/signin", signin);
router.get('/signout', signout)

// export router
module.exports = router;
