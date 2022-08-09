import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./components/Users";
import SuperLogin from "./components/SuperLogin";
import EmailRegister from "./components/EmailRegister";
import AddSystem from "./components/AddSystem";
import System from "./components/System";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<AddSystem />} />
          <Route path="/addsystem" element={<AddSystem />} />
          <Route path="/login" element={<SuperLogin />} />
          <Route path="/user" element={<User />} />
          <Route path="/system" element={<System/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
