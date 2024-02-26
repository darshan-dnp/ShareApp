import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionContext";

function useTransactionContext() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw Error(
      "useTransactionContext must be used inside TransactionContextProvider"
    );
  }
  return context;
}

export default useTransactionContext;
