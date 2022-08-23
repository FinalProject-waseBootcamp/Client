import React from "react";
import { useNavigate } from "react-router-dom";
// import { auth, firebase } from './firebase';
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { Button } from "@mui/material";

export default function Login() {
  debugger
  // const navigate = useNavigate();
  // async function googleLogin() {
  //   //1 - init Google Auth Provider
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   //2 - create the popup signIn
  //   await auth.signInWithPopup(provider).then(
  //     async (result) => {
  //       //3 - pick the result and store the token
  //       const token = await auth?.currentUser?.getIdToken(true);
  //       //4 - check if have token in the current user
  //       if (token) {
  //         //5 - put the token at localStorage (We'll use this to make requests)
  //         localStorage.setItem("@token", token);
  //         //6 - navigate user to the user list
  //         navigate("/user");
  //       }
  //     },
  //     function (error) {
  //       console.log(error);
  //     }
  //   );
  // }
  return (
    <div>
      {/* <button onClick={googleLogin} className="login-button">
        GOOGLE
      </button> */}
      <Button variant="contained" id="googlelogin" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </div>
  );
}
