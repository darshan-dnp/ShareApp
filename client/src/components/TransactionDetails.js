import React from "react";
import useTransactionContext from "../hooks/useTransactionContext";
import useAuthContext from "../hooks/useAuthContext";

function TransactionDetails({ transaction }) {
  const { dispatch } = useTransactionContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const resp = await fetch(
      process.env.REACT_APP_API_URL + "/transactions/" + transaction._id,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );

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
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}

export default TransactionDetails;
