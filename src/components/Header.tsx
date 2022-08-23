import React, { useState } from "react";
import { logout } from "../firebase";
import { User } from "../utils/modals";
import { Roles } from "../utils/modals";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import userStore from "../store/userStore";
import { getAuth } from "firebase/auth";


export default function Header() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const signOut = async() => {
    await logout();
    userStore.logOut();
    navigate("/login");
  };
  return (
    <>
      <nav className="nav">
        <img src={userStore.user?.photoURL||''}></img>
        <h3 id="navTitle">Build your system</h3>
        {(userStore.user) && (
          <nav id="navUser">
             <Button
              color="secondary"
              onClick={() => {
                signOut();
              }}
            >
              LOG OUT 
            </Button>
            <p>| {userStore.user?.displayName}</p>
          </nav>
        )}
      </nav>
    </>
  );
}
