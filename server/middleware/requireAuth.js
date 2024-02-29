const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const requireAuth = async (req, resp, next) => {
  //Verify Auth
  const { authorization } = req.headers;
  if (!authorization) {
    return resp.status(401).json({ error: "Unauthorized request." });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    resp.status(401).json({ error: "Unauthorized request." });
  }
};

module.exports = requireAuth;
