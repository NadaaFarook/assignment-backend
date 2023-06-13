const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const { MONGO_URI } = process.env;

const connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((error) => {
      console.log("Database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

module.exports = { connect };
