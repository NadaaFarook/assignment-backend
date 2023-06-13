const usersModel = require("../model");

async function updateUser(req) {
  try {
    const updatedUser = await usersModel.findOneAndUpdate(
      { email: req.email },
      req.body,
      { new: true }
    );
    return { code: 200, data: updatedUser };
  } catch (error) {
    console.log(error);
    return { code: 400, message: "cannot update the user details" };
  }
}

module.exports = updateUser;
