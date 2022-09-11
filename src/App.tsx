import React, { useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import User from "./components/Users";
import SuperLogin from "./components/logIn/SuperLogin";
import EmailRegister from "./components/logIn/EmailRegister";
import AddSystem from "./components/system/AddSystem";
import MySystem from "./components/system/System";
import EditSystem from "./components/system/EditSystem";
import ResetPassword from "./components/logIn/ResetPassword";
import Header from "./components/Header";
import AdminSystems from "./components/system/AdminSystems";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Maps from "./components/Maps/Maps";
import MyAutocomplete from "./components/Maps/AutoComplete";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import userStore from "./store/userStore";
import AddMarker from "./components/Maps/AddMarker";
import Map from "./components/Maps/Map";

let theme = createTheme();
theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#nnn",
    },
  },
});

let auth = getAuth();
let user = auth.currentUser;
console.log(user);
onAuthStateChanged(auth, (user) => {
  auth = getAuth();
  user = auth.currentUser;
  debugger
  userStore.setUser(user);
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          {/* <Header /> */}
          <Routes>
            <Route path="" element={<SuperLogin />} />
            <Route path="/login" element={<SuperLogin />} />
            <Route path="/emailRegister" element={<EmailRegister />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/user" element={<User />} />
            <Route path="/addSystem" element={<AddSystem />} />
            <Route path="/system/welcome/:name/:uid" element={<MySystem />} />
            <Route path="/adminSystems" element={<AdminSystems />} />
            <Route path="/editSystem" element={<EditSystem />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/auto" element={<MyAutocomplete />} />
            <Route path="/add" element={<AddMarker />} />
          </Routes>
        </Router>
        <img src={require("./utils/logo.jpg")} id="logo" alt="logo"></img>
      </div>
    </ThemeProvider>
  );
}

export default App;
