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
  // const mockUser: User = {
  //   uid: "string",
  //   firstName: "user",
  //   lastName: "name",
  //   email: "string",
  //   role: Roles.SYSTEM_ADMIN,
  //   phone: "string",
  //   password:"string"
  // };
  // const [user, setUser] = useState<User>(mockUser);
  const navigate = useNavigate();
  const signOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <nav className="nav">
        <img src={user?.photoURL||''}></img>
        <h3 id="navTitle">Build your system</h3>

        <Button
              color="secondary"
              onClick={() => {
                signOut();
              }}
            >
              LOG OUT
            </Button>
        {userStore.user && (
          <nav id="navUser">
           
            <p>| {userStore.user.firstName + " " + userStore.user.lastName}</p>
          </nav>
        )}
      </nav>
    </>
  );
}
