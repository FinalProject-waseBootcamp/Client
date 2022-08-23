import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import userStore from '../../store/userStore'
import { User } from "../../utils/modals";

export default function EmailLogin() {
  debugger
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, loading, error] = useAuthState(auth);
  // const [userFromDb, setUserToDb] = useState<any>();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      debugger
      return;
    }
    if (user) {
      debugger
      // loginToDB(user.uid);
      user.getIdToken().then((value=>{
        console.log(value);
        userStore.addUser(user);
      }))
      console.log("userStore.user :",userStore.user);
    }
  }, [user, loading]);
  const loginToDB = async (uid: string) => {
    debugger
    // await userStore.getUser(uid); 
    try { 
      if(!userStore.user._id){
      //  await addUserToDb(uid)
      debugger
      console.log(userStore.user)
      debugger
      navigate("/register");
      }     
      // await userStore.getUser(uid);   
      debugger     
      navigate("/addSystem")
    } catch (error) { 
      debugger
      console.log(error); }
  }
  // const addUserToDb = async (uid: string) => {
  //   const userToDb: any = {
  //     _id: uid,
  //     email:email_ref.current?.value||'',
  //     password:password_ref.current?.value||''
  //   }

  //   try {
  //     debugger;
  //    const res= await userStore.addUser(userToDb);        
  //     setUserToDb(res);
  //   } catch (error) { console.log(error); }
  // }

  // async function handleSubmit() {
  //   // event.preventDefault();

  //   // await auth.signInWithEmailAndPassword(email, password).then(
  //   await logInWithEmailAndPassword(email, password)
  //   .then(
  //     async (result) => {
  //       //3 - pick the result and store the token
  //       const token = await auth?.currentUser?.getIdToken(true);

  //       //4 - check if have token in the current user
  //       if (token) {
  //         //5 - put the token at localStorage (We'll use this to make requests)
  //         localStorage.setItem("@token", token);
  //         //6 - navigate user to the cat list
  //         navigate("/cat-list");
  //       }
  //     },
  //     function (error) {
  //       alert(error);
  //     }
  //   );
  // }
  const email_ref=useRef<HTMLInputElement>();
  const password_ref=useRef<HTMLInputElement>();
  return (
    <form
      onSubmit={async () =>{
        debugger
        const user= await logInWithEmailAndPassword(email, password);
        debugger
    }}
    >
      <div>
        <h3>LOGIN</h3>
      </div>
      <nav id="loginBorder">
        <div className="margin1">
          <div>
            <label htmlFor="email">email: </label>
          </div>
          <TextField
            id="standard-required"
            size="small"
            name="email"
            type="email"
            placeholder="insert a valid email"
            required
            value={email}
            inputRef={email_ref}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="margin1">
          <div>
            <label htmlFor="password"> password: </label>
          </div>
          <TextField
            id="standard-required"
            size="small"
            name="password"
            type="password"
            placeholder="insert a password"
            required
            value={password}
            inputRef={password_ref}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" size="small" type="submit" id="maillogin">
          SUBSCRIBE
        </Button>
      </nav>
    </form>
  );
}
