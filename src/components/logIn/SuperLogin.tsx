import React, { useEffect } from "react";
import '../design.css'
import Login from "./Login";
import EmailRegister from "./EmailRegister";
import EmailLogin from "./EmailLogin";
import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router";
import { Button, Link } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import userStore from "../../store/userStore";
// import { Auth } from "@firebase/auth";

export default function SuperLogin() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      debugger
      // loginToDB(user.uid);
      user.getIdToken().then((value=>{
        console.log(value);
        userStore.getUser(user.uid);
      }))
      console.log("userStore.user :",userStore.user);
      navigate("/addSystem");
    }
  }, [user, loading]);

  const loginToDB = async (uid: string) => {
    debugger
    await userStore.getUser(uid); 
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
    // } catch (error) { 
    //   debugger
    //   console.log(error); }
  }
  return (
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
  );
}
