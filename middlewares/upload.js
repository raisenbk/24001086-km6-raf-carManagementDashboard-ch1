const multer = require("multer"); // Importing Multer module
const ApiError = require("../utils/apiError"); // Importing ApiError utility

// Function to filter file uploads
const multerFiltering = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/svg+xml" // Corrected mimetype for SVG
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new ApiError("Invalid file format!", 400)); // Reject the file with an error
  }
};

// Configure Multer for file upload
const upload = multer({
  fileFilter: multerFiltering, // Apply the file filtering function
  dest: 'public/images/upload', // Destination directory for storing uploaded files
});

module.exports = upload; // Export the configured upload middleware for use in other modules
