const jwt = require("jsonwebtoken");

async function authVerify(req, res, next) {
  //Get token from header

  const token = req.header("x-auth-token");
  const email = req.header("x-auth-email");
  console.log(token, email, "token");
  //Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ message: " No Token, Authorization Denied " });
  }
  if (!email) {
    return res
      .status(401)
      .json({ message: " No Email, Authorization Denied " });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, email);
    //const user = usersModel.findOne({ email });
    req.email = email;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = authVerify;

// TODO : verification if user in db or not.
