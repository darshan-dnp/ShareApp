const express = require("express");
const {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for these routes
router.use(requireAuth);

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
