import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import { auth,sendPasswordReset } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ResetPassword() {

  const [email, setEmail] = React.useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  async function handleSubmit() {
    // preventDefault();
    // await auth.sendPasswordResetEmail(email).then(
      await sendPasswordReset(email).then(
      async (result) => {
        setEmail("");
        alert("Check your email and follow the reset-password link");
      },
      function (error) {
        alert(error);
      }
    ).then(()=>{
      navigate("/addSystem");
    }).catch((ERR) => {alert(ERR);});
  }
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/systems");
  }, [user, loading]);
  return (
    <form 
    // onSubmit={() => handleSubmit}
    >
      <div>
        <h3>Reset Password</h3>
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
        <Button type="submit" onClick={() => sendPasswordReset(email)}>SUBSCRIBE</Button>
      </div>
    </form>
  );
}
