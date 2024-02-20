import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

//Pages and Components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" Component={Home}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
