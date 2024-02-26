import { useEffect } from "react";

import TransactionDetails from "../components/TransactionDetails";
import TransactionForm from "../components/TransactionForm";
import useTransactionContext from "../hooks/useTransactionContext";

function Home() {
  const { transactions, dispatch } = useTransactionContext();

  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch("http://localhost:4000/");
      const respJson = await resp.json();

      if (resp.ok) {
        dispatch({ type: "SET_TRANSACTION", payload: respJson });
      }
    };

    fetchTransactions();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="transactions">
        {transactions &&
          transactions.map((transaction) => (
            <TransactionDetails
              key={transaction._id}
              transaction={transaction}
            />
          ))}
      </div>
      <TransactionForm />
    </div>
  );
}

export default Home;
