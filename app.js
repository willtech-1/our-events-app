//import all require modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');
//import routes
const userRoutes = require("./routes/userRoutes");
const userAuthRoute = require("./routes/user");
const categoryRoutes = require("./routes/category");
const eventRoutes = require("./routes/event");
// use env
require("dotenv").config();
const app = express();

//disable Content Security Policy
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors());
//to get json data from the request body
app.use(bodyParser.json());

// connection to the database
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to the database!!"))
  .catch((err) => console.log("there was an error => " + err));

//middlewares
app.use(morgan("dev"));

// routes middleware
app.use("/api", userRoutes);
app.use("/api", userAuthRoute);
app.use("/api", categoryRoutes);
app.use("/api", eventRoutes);

// deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// access .env port variable
const PORT = process.env.PORT || 8000;

// server listening port
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));


// testing
// module.exports = app;
