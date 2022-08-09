import React, { useState } from "react";
// import { withRouter } from "react-router-dom";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { JsxElement } from "typescript";

export default function EmailRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await auth.createUserWithEmailAndPassword(email, password).then(
      async () => {
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);
        await auth?.currentUser?.sendEmailVerification();

        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@token", token);
          setEmail('');
          setPassword('');
          alert(
            "Press on the verification link that we sent to your email address"
          );
          navigate("/user");
        }
      },
      function (error) {
        alert(error);
      }
    );
  };
  return (
    <form onSubmit={() => handleSubmit}>
      <div>
        <h3>Register with email</h3>
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
      <div>
        <input type="submit" value="Subscribe!" />
      </div>
    </form>
  );
}
