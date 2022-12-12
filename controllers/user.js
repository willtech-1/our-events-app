// import userModel
const User = require("../models/userModel");
/* 
userById method will look for userId route params and anytime there is user ID in the route this method will automatically run and make the user available in the request object
*/
exports.userById = (req, res, next, id) => {
  // find user by id
  // can either find the user or get an error
  User.findById(id).exec((err, user) => {
    // if there is an error or user not found
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // if user is found add user information to request object with the name of profile
    req.profile = user;
    next();
  });
};
