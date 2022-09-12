import React, { useEffect, useState } from "react";
import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import userStore from "../store/userStore";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Header() {
  const [currentUser, setCurrentUser] = useState<any>();

  let auth = getAuth();
  let user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    auth = getAuth();
    user = auth.currentUser;
    debugger
    userStore.setUser(user);
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
           <Stack direction="row" >
           <Avatar alt="profile" src={user.photoURL} sx={{ width: 56, height: 56 }}/>
         </Stack>
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
