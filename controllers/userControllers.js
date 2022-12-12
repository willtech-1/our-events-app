// import userModel
const User = require("../models/userModel");
// import jsonwebtoken & express-jwt for authenticating user by generating signed token
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// get secret
require("dotenv").config();

// signup a new user
exports.signup = (req, res) => {
  // console.log(req.body)
  // create a new user based on what we get on the request body
  const user = new User(req.body);
  // save created user to the database
  user.save((err, user) => {
    // if there is an error when saving the user
    if (err) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }
    // if successfully saved
    res.status(201).json({
      user,
    });
  });
};

// user signin
exports.signin = (req, res) => {
  // destructure email and password
  const { email, password } = req.body;

  // find user based on email
  User.findOne({ email }, (err, user) => {
    // if user does not exit or there is an err
    if (!user || err) {
      return res
        .status(400)
        .json({ error: "User with that email does not exist. Please signup" });
    }
    // if user exist then authenticate the user and make sure email and password match
    if (user.password !== password) {
      return res.status(401).json({
        error: "User Email and Password do not match!",
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // destructure user values
    const { _id, name, email, role } = user;

    // return response with user and token to frontend client
    return res.json({ token, user: { _id, name, email, role } });
  });
};

// user signout
exports.signout = (req, res) => {
  res.json({message: "Signed out successfully!"})
}

// to protect routes by using express jwt only signined user will interact with the application
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// authenticate user middleware
exports.isAuth = (req, res, next) => {
  // if user is authenticated
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  // if not true
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  // if true then authorize
  next();
};

// authenticate admin middleware
exports.isAdmin = (req, res, next) => {
  // check if the profile is not for admin
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }

  next();
};
