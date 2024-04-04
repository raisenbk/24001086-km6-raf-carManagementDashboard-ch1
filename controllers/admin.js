const Car = require("../models/cars"); // Importing Car model

// Controller function to render admin page
const adminPage = async (req, res) => {
  let fullUrl = "http://localhost:8000/dashboard";
  try {
    const url = req.url;
    let seat = 0;
    if (url === "/?category=small") {
      fullUrl += url.slice(1);
      seat = 1;
    } else if (url === "/?category=medium") {
      fullUrl += url.slice(1);
      seat = 4;
    } else if (url === "/?category=large") {
      fullUrl += url.slice(1);
      seat = 7;
    }

    const { category, search } = req.query;

    const condition = {};

    if (category) {
      condition.seats = { $gte: Number(seat), $lt: Number(seat) + 3 };
    }

    if (search) {
      condition.name = new RegExp(search, "i");
    }

    const cars = await Car.find().where(condition).exec();
    res.render("index", { // Rendering index view with data
      title: "dashboard",
      fullUrl,
      cars,
      message: req.flash("message", ""),
    });
  } catch (err) {
    // Catching errors and sending response with status 500
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Controller function to render create car page
const createCarPage = async (req, res) => {
  try {
    res.render("create", { // Rendering create view
      title: "create car",
    });
  } catch (err) {
    // Catching errors and sending response with status 500
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Controller function to render edit car page
const editCarPage = async (req, res) => {
  try {
    const car = await Car.find().where({
      _id: req.query.id,
    });
    res.render("edit", { // Rendering edit view with car data
      car,
    });
  } catch (err) {
    // Catching errors and sending response with status 500
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Controller function to handle car creation
const createCar = async (req, res) => {
  const { name, priceRent, seats, type } = req.body;
  const file = req.file;
  try {
    if (!req.file) {
      throw new Error('No image file provided');
    }
    const split = file.originalname.split(".")
    const extension = split[split.length - 1]

    const car = await Car.create({ // Creating a new car
      name,
      priceRent,
      seats,
      type,
      image: `/images/upload/${req.file.filename}`,
    });

    req.flash("message", "Added");
    res.redirect("/dashboard"); // Redirecting to dashboard page after car creation
  } catch (err) {
    // Catching errors and sending response with status 500
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
}

// Controller function to handle car editing
const editCar = async (req, res) => {
  const { name, priceRent, seats, type } = req.body;
  const file = req.file;
  let imgUrl;

  try {
    const id = req.query.id;

    if (file && file.filename) {
      imgUrl = `/images/upload/${file.filename}`; 
    } else {
      const lastFile = await Car.findById(id);
      if (lastFile && lastFile.image) {
        imgUrl = lastFile.image;
      } else {
        console.error('File or image URL not found');
      }
    }

    const now = new Date();
    const dateTimeString = `${now.toDateString()} ${now.toTimeString()}`;

    const updateCar = {
      name,
      priceRent,
      seats,
      type,
      image: imgUrl,
      lastModified: dateTimeString,
    };

    await Car.findByIdAndUpdate(id, updateCar, { new: true });
    req.flash("message", "Updated");
    res.redirect("/dashboard");
  } catch (err) {
    // Catching errors and sending response with status 500
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Controller function to handle car deletion
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    await Car.findByIdAndRemove(id); // Finding and deleting car by ID
    req.flash("message", "Deleted");
    res.redirect("/dashboard");
  } catch (err) {
    // Catching errors and sending response with status 500
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Exporting all controller functions for use in other modules
module.exports = {
  adminPage,
  createCarPage,
  editCarPage,
  createCar,
  editCar,
  deleteCar,
};
