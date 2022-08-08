import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from './components/Users'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="" element={<User/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
