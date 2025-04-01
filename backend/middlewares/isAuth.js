const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  //! Get the token from the req headers
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  //! Verify the token
  const verifyToken = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );

  if (verifyToken) {
    //! Save the user id to the req obj
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token expired, login again");
    next(err);
  }
};

module.exports = isAuthenticated;
