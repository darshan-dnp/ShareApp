const Transaction = require("../models/transactionsModel");
const mongoose = require("mongoose");

// Get All Transactions
const getAllTransaction = async (req, resp) => {
  const transactions = await Transaction.find({}).sort({ createdAt: -1 });
  resp.status(200).json(transactions);
};

// Get By ID
const getSingleTransaction = async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).json({ error: "Invalid ID." });
  }

  const transactions = await Transaction.findById(id);
  if (!transactions) {
    return resp.status(404).json({ error: "No Such Transaction." });
  }
  return resp.status(200).json(transactions);
};

// Create Transaction
const createTransaction = async (req, resp) => {
  const { title, amount, payee, payors } = req.body;

  try {
    const transaction = await Transaction.create({
      title,
      amount,
      payee,
      payors,
    });
    resp.status(200).json(transaction);
  } catch (error) {
    resp.status(400).json({ error: error.message });
  }
};

// Delete Transaction
const deleteTransaction = async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).json({ error: "Invalid ID." });
  }

  const transactions = await Transaction.findOneAndDelete({ _id: id });
  if (!transactions) {
    return resp.status(400).json({ error: "No Such Transaction." });
  }
  return resp.status(204).json();
};

// Update Transaction
const updateTransaction = async (req, resp) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).json({ error: "Invalid ID." });
  }

  const transactions = await Transaction.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!transactions) {
    return resp.status(400).json({ error: "No Such Transaction." });
  }
  return resp.status(200).json(transactions);
};

module.exports = {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  deleteTransaction,
  updateTransaction,
};
