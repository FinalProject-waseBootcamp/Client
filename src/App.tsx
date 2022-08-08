import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./components/Users";
import SuperLogin from "./components/SuperLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<SuperLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
