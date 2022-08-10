import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./components/Users";
import SuperLogin from "./components/SuperLogin";
import EmailRegister from "./components/EmailRegister";
import System from "./components/System";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<SuperLogin />} />
          <Route path="/login" element={<SuperLogin />} />
          <Route path="/user" element={<User />} />
          <Route path="/system/welcome/:name/:uid" element={<System />}>
            {/* <Route path="*" element={<System />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
