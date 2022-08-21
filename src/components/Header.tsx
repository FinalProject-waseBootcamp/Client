import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase";
import { User } from "../utils/modals";
import {Roles} from "../utils/modals"

export default function Header() {
  const mockUser: User = {
    uid: "string",
    firstName: "user",
    lastName: "name",
    email: "string",
    role: Roles.SYSTEM_ADMIN,
    phone: "string",
  };
  const [user, setUser] = useState<User>(mockUser);
  const navigate = useNavigate();
  const signOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <nav className="nav">
        <h3 id="navTitle">Build your system</h3>
        {user && (
          <nav id="navUser">
            <Button
            color="secondary"
              onClick={() => {
                signOut();
              }}
            >
              LOG OUT
            </Button>
            <p>| {user.firstName + " " + user.lastName}</p>
          </nav>
        )}
      </nav>
    </>
  );
}
