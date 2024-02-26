import { createContext, useReducer } from "react";

export const TransactionsContext = createContext();

export const transactionReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRANSACTION":
      return {
        transactions: action.payload,
      };
    case "ADD_TRANSACTION":
      return {
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE_TRANSACTION":
      return {
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const TransactionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: null,
  });

  return (
    <TransactionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TransactionsContext.Provider>
  );
};
