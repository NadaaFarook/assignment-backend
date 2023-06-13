// add ts to show error in vscode sh

const express = require("express");
const router = express.Router();
const auth = require("./services/auth");
const getUser = require("./services/get");
const updateUser = require("./services/update");
const authVerify = require("../../middlewares/authVerify");
const login = require("./services/login");
// register
router.post("/", async (req, res) => {
  const response = await auth(req);
  res.status(response.code).send(response);
});

router.post("/login", async (req, res) => {
  const response = await login(req);
  res.status(response.code).send(response);
});

// get user
router.get("/", authVerify, async (req, res) => {
  const response = await getUser(req);
  res.status(response.code).send(response);
});

// update user
router.put("/", authVerify, async (req, res) => {
  const response = await updateUser(req);
  res.status(response.code).send(response);
});

module.exports = router;
