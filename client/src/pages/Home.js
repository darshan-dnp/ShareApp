import { useEffect } from "react";

import TransactionDetails from "../components/TransactionDetails";
import TransactionForm from "../components/TransactionForm";
import useTransactionContext from "../hooks/useTransactionContext";
import useAuthContext from "../hooks/useAuthContext";

function Home() {
  const { transactions, dispatch } = useTransactionContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTransactions = async () => {
      const resp = await fetch(
        process.env.REACT_APP_API_URL + "/transactions/",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      const respJson = await resp.json();

      if (resp.ok) {
        dispatch({ type: "SET_TRANSACTION", payload: respJson });
      }
    };
    if (user) {
      fetchTransactions();
    }
  }, [dispatch, user]);

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
