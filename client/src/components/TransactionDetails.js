import React from "react";

function TransactionDetails({ transaction }) {
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
    </div>
  );
}

export default TransactionDetails;
