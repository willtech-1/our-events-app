// import modules
const express = require("express");
const router = express.Router();
//import controllers
const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/userControllers");


// authenticate && authorize users
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

//router.param to check the parameter everytime there is 'userId'
router.param("userId", userById);
// export router
module.exports = router;
