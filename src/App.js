
import Navbar from "./Component/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Component/Home";
import About from "./Component/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./Component/Alert";
import Login from "./Component/Login";
import Signup from "./Component/Signup";

function App() {
  return (
  <>
  <NoteState>
      <Router>
      <Navbar/>
      <Alert/>
        <div className="container">
        <Routes >
              <Route exact path="/" element={<Home/>}> </Route>
              <Route exact path="/about" element={<About/>}> </Route>
              <Route exact path="/login" element={<Login/>}> </Route>
              <Route exact path="/signup" element={<Signup/>}> </Route>
        </Routes>
      </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
