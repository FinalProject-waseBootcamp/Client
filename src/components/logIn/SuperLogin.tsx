import React, { useEffect } from "react";
import '../../css/design.css'
import Login from "./Login";
import EmailRegister from "./EmailRegister";
import EmailLogin from "./EmailLogin";
import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router";
import { Button, Link } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import userStore from "../../store/userStore";
import Header from "../Header";
// import { Auth } from "@firebase/auth";
import { getAuth,onAuthStateChanged, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider } from "firebase/auth";


export default function SuperLogin() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  // useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (loading) {
      return;
    }
    else if (user) {
      debugger

          // localStorage.setItem('user','true');
          
      user.getIdToken().then(value=>{
        console.log(value);
        userStore.addUser(user);
        navigate("/addSystem");
        // alert("userStore.user :"+userStore.user.displayName+" photo: "+userStore.user.photoURL);
      })
    }
    else {
      // User is signed out
      // ...
      // localStorage.removeItem('user');

      navigate('/login');
    }
  })
  // }, [user, loading]);

  const loginToDB = async (uid: string) => {
    // debugger
    // await userStore.getUser(uid); 
    // try { 
    //   if(!userStore.user){
    //   //  await addUserToDb(uid)
    //   debugger
    //   console.log(userStore.user)
    //   debugger
    //   navigate("/register");
    //   }     
    //   // await userStore.getUser(uid);   
    //   debugger     
      // navigate("/addSystem")
    // } catch21 (error) { 
    //   debugger
    //   console.log(error); }
  }
  return (
    <>
      <Header />
    <div id="externalLogin">
      <>
        <EmailLogin />
      </>
      <>
        <Login />
      </>
      <Button
        variant="text"
        size="small"
        onClick={() => navigate("/resetPassword")}
        className="margin1"
      >
        FORGOT YOUR PASSWORD ?
      </Button>
      🤷‍♂️
      <Button
        variant="text"
        size="small"
        onClick={() => navigate("/emailRegister")}
        className="margin1"
      >
        DON'T HAVE AN ACCOUNT ?
      </Button>
    </div>
    </>
  );
}
