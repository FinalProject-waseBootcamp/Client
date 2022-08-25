import React, { useEffect, useState } from "react";
import { logout } from "../firebase";
import { User } from "../utils/modals";
import { Roles } from "../utils/modals";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import userStore from "../store/userStore";
import { getAuth,onAuthStateChanged, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider } from "firebase/auth";

export default function Header() {
  const auth = getAuth();
  const user = auth.currentUser;

  // useEffect(() => {
  //    auth = getAuth();
  //    user = auth.currentUser;
  // }, [])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      localStorage.setItem('user', 'true');
      // ...
    } else {
      // User is signed out
      // ...
      localStorage.removeItem('user');
    }
  });

  // Revoke all refresh tokens for a specified user for whatever reason.
// Retrieve the timestamp of the revocation, in seconds since the epoch.
// getAuth()
// .revokeRefreshTokens(uid)
// .then(() => {
//   return getAuth().getUser(uid);
// })
// .then((userRecord) => {
//   return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
// })
// .then((timestamp) => {
//   console.log(`Tokens revoked at: ${timestamp}`);
// });

  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    userStore.logOut();
  };
  return (
    <>
      <nav className="nav">
        <img
          src={
            // userStore.user?.photoURL
            user?.photoURL || ""
          }
        ></img>
        <h3 id="navTitle">Build your system</h3>
        {
          // (userStore.user)
          user && (
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
                |{/* {userStore.user?.displayName} */}
                {user.displayName}
              </p>
            </nav>
          )
        }
      </nav>
    </>
  );
}
