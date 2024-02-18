const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionsController");

// get all
router.get("/", getAllTransaction);

// get by id
router.get("/:id", getSingleTransaction);

// post new
router.post("/", createTransaction);

// delete one
router.delete("/:id", deleteTransaction);

// update one
router.patch("/:id", updateTransaction);

module.exports = router;
