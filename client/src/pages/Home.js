import { useEffect, useState } from "react";
import TransactionDetails from "../components/TransactionDetails";

function Home() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("Calling fetch");
      const resp = await fetch("http://localhost:4000/");
      console.log(resp);
      const respJson = await resp.json();

      if (resp.ok) {
        setTransactions(respJson);
      }
    };

    fetchTransactions();
  }, []);

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
    </div>
  );
}

export default Home;
