import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";

export default function EmailLogin() {
  debugger
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/systems");
    }
  }, [user, loading]);

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
  return (
    <form
      onSubmit={async () => await logInWithEmailAndPassword(email, password)}
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
