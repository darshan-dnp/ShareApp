import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

//Pages and Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { TransactionsContextProvider } from "./context/TransactionContext";
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <TransactionsContextProvider>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to={"/"} />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to={"/"} />}
              />
            </Routes>
          </div>
        </TransactionsContextProvider>
      </Router>
    </div>
  );
}

export default App;
