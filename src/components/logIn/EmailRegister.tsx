import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { JsxElement } from "typescript";
import { Button } from "@mui/material";
import {registerWithEmailAndPassword} from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

export default function EmailRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  // const handleSubmit = async () => {
  //   await auth.createUserWithEmailAndPassword(email, password).then(
  //     // await registerWithEmailAndPassword(name, email, password).then(
  //     async () => {
  //       //3 - pick the result and store the token
  //       const token = await auth?.currentUser?.getIdToken(true);
  //       await auth?.currentUser?.sendEmailVerification();

  //       //4 - check if have token in the current user
  //       if (token) {
  //         //5 - put the token at localStorage (We'll use this to make requests)
  //         localStorage.setItem("@token", token);
  //         setEmail('');
  //         setPassword('');
  //         alert(
  //           "Press on the verification link that we sent to your email address"
  //         );
  //         navigate("/user");
  //       }
  //     },
  //     function (error) {
  //       alert(error);
  //     }
  //   );
  // };
  useEffect(() => {
    if (loading) return;
    if (user){
      // addUserToDb(user.uid);
      navigate("/addSystem");
    } 
  }, [user, loading]);
  return (
    <form onSubmit={async() =>await registerWithEmailAndPassword(name, email, password)}>
      <div>
        <h3>Register with email</h3>
      </div>
      <div>
        <label htmlFor="user">Enter your name: </label>
        <input
          name="name"
          type="text"
          placeholder="insert your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="user">Enter your email: </label>
        <input
          name="email"
          type="email"
          placeholder="insert a valid email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pwd">Enter your password: </label>
        <input
          name="password"
          type="password"
          placeholder="insert a password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
        <Button type="submit">SUBSCRIBE</Button>
    </form>
  );
}
