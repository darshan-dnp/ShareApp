import React, { useState } from "react";
import useTransactionContext from "../hooks/useTransactionContext";
import useAuthContext from "../hooks/useAuthContext";

function TransactionForm() {
  const { dispatch } = useTransactionContext();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [payors, setPayors] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!(title && amount && payee && payors)) {
      setError("All fields are required!");
      return;
    } else {
      const transaction = { title, amount, payee, payors };

      const resp = await fetch(
        process.env.REACT_APP_API_URL + "/transactions/",
        {
          method: "POST",
          body: JSON.stringify(transaction),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
        }
      );

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
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Transaction</h3>

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value.trim());
          setError(null);
        }}
        value={title}
      />

      <label>Amount:</label>
      <input
        type="number"
        onChange={(e) => {
          setAmount(e.target.value.trim());
          setError(null);
        }}
        value={amount}
      />

      <label>Payee:</label>
      <input
        type="text"
        onChange={(e) => {
          setPayee(e.target.value.trim());
          setError(null);
        }}
        value={payee}
      />

      <label>Payors:</label>
      <input
        type="text"
        onChange={(e) => {
          setPayors(e.target.value.trim());
          setError(null);
        }}
        value={payors}
      />

      <button>Add Transaction</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default TransactionForm;
