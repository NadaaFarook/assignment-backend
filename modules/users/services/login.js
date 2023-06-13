const usersModel = require("../model");
var jwt = require("jsonwebtoken");

async function login(req) {
  const { email, token } = req.body;

  if (!token || !email) return { code: 400, message: "Missing Mandatory Data" };

  try {
    const userExist = await usersModel.findOne({ email: email });
    const sessionToken = jwt.sign(token, email);

    if (!userExist) {
      return { code: 400, message: "Account doesn't exist, please sign up" };
    }
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
  } catch (error) {
    console.log(error);
    return { code: 400, message: "Cannot register" };
  }
}

module.exports = login;
