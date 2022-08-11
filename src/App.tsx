import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./components/Users";
import SuperLogin from "./components/SuperLogin";
import EmailRegister from "./components/EmailRegister";
import System from "./components/System";
import AddSystem from "./components/AddSystem";
import MySystems from "./components/AdminSystems";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditSystem from "./components/EditSystem";
import ResetPassword from "./components/ResetPassword";
import Header from "./components/Header";

let theme = createTheme();
theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#ff6e40",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="" element={<SuperLogin />} />
            <Route path="/login" element={<SuperLogin />} />
            <Route path="/emailRegister" element={<EmailRegister />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/user" element={<User />} />
            <Route path="/addSystem" element={<AddSystem />} />
            <Route path="/system/welcome/:name/:uid" element={<System />}>
              {/* <Route path="*" element={<System />} /> */}
            </Route>
            <Route path="/mySystems" element={<MySystems />} />
            <Route path="/editSystem" element={<EditSystem />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
