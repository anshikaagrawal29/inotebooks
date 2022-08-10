
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
      <Routes >
            <Route exact path="/" element={<Home/>}> </Route>
            <Route exact path="/about" element={<About/>}> </Route>
      </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
