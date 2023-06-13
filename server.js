require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { ORIGIN } = process.env;
var corsOptions = {
  origin: ORIGIN,
};

app.use(cors());

const users = require("./modules/users/router");
require("./config/database").connect();

app.use("/api/users", users);

app.get("/api", (req, res) => {
  res.send("Api Working!!");
});

const { PORT } = process.env;

app.listen(PORT, function () {
  console.log(
    "Server running on http://localhost:" + PORT + " at origin " + ORIGIN
  );
});
