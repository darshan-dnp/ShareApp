import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

//Pages and Components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { TransactionsContextProvider } from "./context/TransactionContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <TransactionsContextProvider>
            <Routes>
              <Route path="/" Component={Home}></Route>
            </Routes>
          </TransactionsContextProvider>
        </div>
      </Router>
    </div>
  );
}

export default App;
