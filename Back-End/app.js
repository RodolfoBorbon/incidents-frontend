//app.js
const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");

// Routes
const userRoutes = require("./routes/userRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

/*
CORS - Cross Origin Request Security. 
localhost:3000 - backend API 
localhost: 4200 - front-end
*/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Whith, Content-Type, Accept"
  );
  next();
});
//---------------------------------------------------------------ROUTING PRODUCT SURVEYS-------------------------------------------------------
//13. Define route

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//19. ***********************************  move to the front end set up  ***************************************************************
