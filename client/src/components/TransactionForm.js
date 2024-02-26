import React, { useState } from "react";
import useTransactionContext from "../hooks/useTransactionContext";

function TransactionForm() {
  const { dispatch } = useTransactionContext();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [payors, setPayors] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = { title, amount, payee, payors };

    const resp = await fetch("http://localhost:4000/", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const respJson = await resp.json();
    if (resp.ok) {
      setTitle("");
      setAmount("");
      setPayee("");
      setPayors("");
      setError(null);
      dispatch({ type: "ADD_TRANSACTION", payload: respJson });
    } else {
      setError(respJson.error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Transaction</h3>

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />

      <label>Payee:</label>
      <input
        type="text"
        onChange={(e) => setPayee(e.target.value)}
        value={payee}
      />

      <label>Payors:</label>
      <input
        type="text"
        onChange={(e) => setPayors(e.target.value)}
        value={payors}
      />

      <button>Add Transaction</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default TransactionForm;
