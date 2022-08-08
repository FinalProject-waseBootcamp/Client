import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./components/Users";
import SuperLogin from "./components/SuperLogin";
import EmailRegister from "./components/EmailRegister";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<SuperLogin />} />
          {/* <Route path="/register" element={<EmailRegister />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
