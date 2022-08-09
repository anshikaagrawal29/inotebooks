
import Navbar from "./Component/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Component/Home";
import About from "./Component/About";

function App() {
  return (
  <>
      <Router>
      <Navbar/>
      <Routes >
            <Route exact path="/" element={<Home/>}> </Route>
            <Route exact path="/about" element={<About/>}> </Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
