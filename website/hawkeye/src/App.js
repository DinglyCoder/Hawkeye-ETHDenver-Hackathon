import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
