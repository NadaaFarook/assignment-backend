const usersModel = require("../model");
var jwt = require("jsonwebtoken");

async function saveUser(req) {
  const { email, token, name } = req.body;

  if (!email || !name) return { code: 400, message: "Missing Mandatory Data" };

  try {
    const userExist = await usersModel.findOne({ email: email });
    const sessionToken = jwt.sign(token, email);

    if (userExist) {
      // check existing token
      const tokenExist = await usersModel.findOne({
        tokens: { $in: [sessionToken] },
      });
      if (tokenExist)
        return {
          code: 200,
          data: tokenExist,
          session: sessionToken,
          message: "Login Successful",
        };

      // login
      const newTokenList = [...userExist.tokens, sessionToken];
      const userData = await usersModel.findOneAndUpdate(
        { email: email },
        { ...userExist, tokens: newTokenList }
      );
      return {
        code: 200,
        data: userData,
        session: sessionToken,
        message: "Login Successful",
      };
    } else {
      // register
      const user = new usersModel({
        ...req.body,
        tokens: [sessionToken],
        imagesUploads: [],
        layers: [],
      });
      const newUser = await user.save();
      return {
        code: 200,
        data: newUser,
        session: sessionToken,
        message: "User Created",
      };
    }
  } catch (error) {
    console.log(error);
    return { code: 400, message: "Cannot register" };
  }
}

module.exports = saveUser;
