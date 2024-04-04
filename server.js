// 3rd Party Packages
const dotenv = require("dotenv");
const app = require(`./app`);
const mongoose = require("mongoose");

// Configuration
dotenv.config();
const port = process.env.PORT || 8000;
const database = process.env.DB_URL;

// Database Connect
mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) =>
    console.log({
      status: "error",
      message: err.message,
    })
  );

// listen Port
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
