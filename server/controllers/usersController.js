const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login
const loginUser = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(email, password);

    //token
    const token = createToken(user._id);
    resp.status(200).json({ email, token });
  } catch (e) {
    resp.status(400).json({ error: e.message });
  }
};

//signup
const signupUser = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.signupUser(email, password);

    //token
    const token = createToken(user._id);
    resp.status(200).json({ email, token });
  } catch (e) {
    resp.status(400).json({ error: e.message });
  }
};

module.exports = { loginUser, signupUser };
