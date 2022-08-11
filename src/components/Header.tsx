import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase";

export default function Header() {
  debugger
  const navigate=useNavigate();
  const signOut=()=>{
    debugger
      logout();
      debugger
      navigate('/login');
  }
  return (
    <>
      <nav className="nav">
        <h3 id="navTitle">Build your system</h3>
          <Button
          id="navButton"
           onClick={()=>{
            debugger
            signOut()}}
          >
            LOG OUT
          </Button>
      </nav>
    </>
  );
}
