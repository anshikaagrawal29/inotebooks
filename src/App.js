
import Navbar from "./Component/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Component/Home";
import About from "./Component/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
  <>
  <NoteState>
      <Router>
      <Navbar/>
        <div className="container">
        <Routes >
              <Route exact path="/" element={<Home/>}> </Route>
              <Route exact path="/about" element={<About/>}> </Route>
        </Routes>
      </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
