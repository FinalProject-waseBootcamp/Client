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
  let auth = getAuth();
  let user = auth.currentUser;

  // useEffect(() => {
  // const  isNull=async()=>{
  //   if (user == null) {
  //     user = await auth.instance.onAuthStateChanged.first;
  //   }
  // }
  // }, [])

  // const userLocal = JSON.parse(localStorage.getItem('user')||'');
  // userLocal ? <SignedInLinks/> : <SignedOutLinks/>;

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
    // localStorage.removeItem('user');
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
