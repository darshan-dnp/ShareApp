import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const resp = await fetch(process.env.REACT_APP_API_URL + "/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const respJson = await resp.json();
    if (!resp.ok) {
      setIsLoading(false);
      setError(respJson.error);
    } else {
      localStorage.setItem("user", JSON.stringify(respJson));
      dispatch({ type: "LOGIN", payload: respJson });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
