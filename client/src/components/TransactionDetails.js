import React from "react";
import useTransactionContext from "../hooks/useTransactionContext";

function TransactionDetails({ transaction }) {
  const { dispatch } = useTransactionContext();

  const handleClick = async () => {
    const resp = await fetch("http://localhost:4000/" + transaction._id, {
      method: "DELETE",
    });

    if (resp.status === 204) {
      dispatch({ type: "DELETE_TRANSACTION", payload: transaction._id });
    }
  };

  return (
    <div className="transaction-details">
      <h4>{transaction.title}</h4>
      <p>
        <strong>Amount: </strong>
        {transaction.amount}
      </p>
      <p>
        <strong>Payee: </strong>
        {transaction.payee}
      </p>
      <p>
        <strong>Payors: </strong>
        {transaction.payors.join(", ")}
      </p>
      <p>{transaction.updatedAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
}

export default TransactionDetails;
