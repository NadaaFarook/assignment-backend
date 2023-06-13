const usersModel = require("../model");
async function getUser(req) {
  try {
    const user = await usersModel.findOne({ email: req.email });
    return { code: 200, data: user };
  } catch (err) {
    return { code: 400, message: "Cannot fetch user details" }; // jwt token not valid
  }
}

module.exports = getUser;

//responses
/*

{ code: 400, message: "error getting user" } //username not provided
{ code: 400, message: "username not valid" } // username user not in db
{ code: 200, data: user, isAuthenticated: false } // public data
{ code: 200, data: user, isAuthenticated: true } // authenticated data

*/
