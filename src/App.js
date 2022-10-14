import React from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Error from "./components/Error";
import Room from "./components/room/Room";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} exact/>
          <Route path="/:room" element={<Room/>} exact/>
          <Route path="/*" element={<Error/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
