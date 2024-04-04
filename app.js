// Import necessary modules
const express = require("express"); // Express module for creating web applications
const morgan = require("morgan"); // Morgan module for HTTP request logging
const flash = require("connect-flash"); // Connect Flash module for flash messages
const session = require("express-session"); // Express Session module for session management

// Import created routers
const carRouter = require("./routes/car"); // Router for car-related endpoints
const adminRouter = require("./routes/admin"); // Router for admin-related endpoints

// Create an Express application
const app = express();

// Use middleware for parsing JSON request body
app.use(express.json());

// Use middleware for parsing URL encoded request body
app.use(express.urlencoded({ extended: true }));

// Use Morgan middleware for logging
app.use(morgan("dev"));

// Middleware to redirect requests to '/dashboard' if the request URL is '/'
app.use((req, res, next) => {
  if (req.url === "/") res.redirect("/dashboard");
  else next();
});

// Use Express Session middleware for session management
app.use(
  session({
    secret: "secret", // Secret key for signing session ID cookie
    saveUninitialized: true, // Save session even if no data is stored
    resave: true, // Reset save time on every request access
  })
);

// Use Connect Flash middleware for flash messages
app.use(flash());

// Use middleware to serve static files from the 'public' directory
app.use(express.static(`${__dirname}/public`));

// Set the 'views' directory for the EJS template engine
app.set("views", `${__dirname}/views`);

// Set the template engine to be used
app.set("view engine", "ejs");

// Use router for car-related endpoints
app.use("/api/v1/car", carRouter);

// Use router for admin-related endpoints
app.use("/dashboard", adminRouter);

// Export the Express application
module.exports = app;
