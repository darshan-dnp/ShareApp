require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const transactionsRoutes = require("./routes/transactions");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, resp, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/", transactionsRoutes);

// connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // port setup
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
