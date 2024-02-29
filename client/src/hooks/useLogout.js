import useAuthContext from "./useAuthContext";
import useTransactionContext from "./useTransactionContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: transactionDispatch } = useTransactionContext();

  const logout = () => {
    //remove from browser
    localStorage.removeItem("user");

    //change state
    dispatch({ type: "LOGOUT" });
    transactionDispatch({ type: "SET_TRANSACTION", payload: null });
  };
  return { logout };
};
