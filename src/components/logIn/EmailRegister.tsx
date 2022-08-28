import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { registerWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { Roles, User } from "../../utils/modals";
import userStore from "../../store/userStore";

export default function EmailRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  // async function createUser(){
  //   const newUser={

  //   }
  //   const response= await axios.post('http://localhost:3333/user',newUser);
  // }

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

  // const addUserToDb = async (uid: string) => {
  //   const userToDb: User = {
  //     uid: uid,
  //     email: email,
  //     password: password,
  //     firstName: firstName,
  //     lastName: lastName,
  //     phone: phone,
  //     role: Roles.SYSTEM_ADMIN,
  //   };
  //   try {
  //     debugger;
  //     const res = await userStore.addUser(userToDb);
  //     debugger;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if (loading) return;
    if (user) {
      // addUserToDb(user.uid);
      user.getIdToken().then((value) => {
        console.log(value);
        userStore.addUser(user);
      });
      console.log("userStore.user :", userStore.user);
      navigate("/addSystem");
    }
  }, [user, loading]);

  return (
    <form
    // onSubmit={async () => {
    //   const name=firstName+' '+lastName;
    //   await registerWithEmailAndPassword(name, email, password);

    // try{
    //   const newUser:User={
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     password: password,
    //     role: Roles.SYSTEM_ADMIN,
    //     phone: phone
    //   }
    //   await axios.post('http://localhost:3333/user',newUser)
    // }catch(e){ alert(e); }
    // }}
    >
      <div id="externalLogin">
        <div>
          <h3>Register with email</h3>
        </div>
        <div>
          <label htmlFor="firstName">Enter your first name: </label>
          <TextField
            id="standard-required"
            size="small"
            name="firstName"
            type="text"
            placeholder="insert your first name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Enter your last name: </label>
          <TextField
            id="standard-required"
            size="small"
            name="lastName"
            type="text"
            placeholder="insert your last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Enter your email: </label>
          <TextField
            id="standard-required"
            size="small"
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
          <TextField
            id="standard-required"
            size="small"
            name="pwd"
            type="password"
            placeholder="insert a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Enter your phone number: </label>
          <TextField
            id="standard-required"
            size="small"
            name="phone"
            type="text"
            placeholder="insert a phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <Button
          onClick={async () => {
            const name = firstName + " " + lastName;
            await registerWithEmailAndPassword(name, email, password);
          }}
        >
          SUBSCRIBE
        </Button>
      </div>
    </form>
  );
}
