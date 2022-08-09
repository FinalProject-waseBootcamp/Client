import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

export default function EmailLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    // event.preventDefault();

    await auth.signInWithEmailAndPassword(email, password).then(
      async (result) => {
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);

        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@token", token);
          //6 - navigate user to the cat list
          navigate("/cat-list");
        }
      },
      function (error) {
        alert(error);
      }
    );
  }
  return (
    <form onSubmit={() => handleSubmit}>
      <div>
        <h3>Login with email</h3>
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
