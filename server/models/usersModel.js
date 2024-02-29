const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//signup
userSchema.statics.signupUser = async function (email, password) {
  // Validaions
  if (!email || !password) {
    throw Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use.");
  }

  const hashSalt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, hashSalt);

  const user = await this.create({ email, password: passHash });
  return user;
};

//login
userSchema.statics.loginUser = async function (email, password) {
  // Validaions
  if (!email || !password) {
    throw Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Login Credentials.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Invalid Login Credentials.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Login Credentials.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Login Credentials.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
