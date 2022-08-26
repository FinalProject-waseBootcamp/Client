import React, { useEffect, useState } from "react";
import { logout } from "../firebase";
import { User } from "../utils/modals";
import { Roles } from "../utils/modals";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import userStore from "../store/userStore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  signInWithRedirect,
  inMemoryPersistence,
  GoogleAuthProvider,
} from "firebase/auth";

export default function Header() {
  const [currentUser, setCurrentUser] = useState<any>();

  let auth = getAuth();
  let user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    auth = getAuth();
    user = auth.currentUser;
    userStore.addUser(user);
    setCurrentUser(user);
  });

  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    userStore.logOut();
    setCurrentUser(null);
  };
  return (
    <>
      <nav className="nav">
        {/* {currentUser?.photoURL && ( */}
        {user?.photoURL&&(
          <img
            src={
              userStore.user?.photoURL
              // currentUser.photoURL
            }
          ></img>
        )}
        <h3 id="navTitle">Build your system</h3>
        {
          // currentUser && (
          userStore.user&&(
            <nav id="navUser">
              <Button
                color="secondary"
                onClick={async () => {
                  await signOut();
                  navigate("/login");
                }}
              >
                LOG OUT
              </Button>
              <p>
                |{userStore.user?.displayName}
                {/* {currentUser.displayName} */}
              </p>
            </nav>
          )
        }
      </nav>
    </>
  );
}
