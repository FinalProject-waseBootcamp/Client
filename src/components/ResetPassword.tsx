import React from "react";
import { useNavigate } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import { auth } from "./firebase";

export default function ResetPassword() {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         email: ''
  //     };

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }
  const [email, setEmail] = React.useState("");
  // handleChange(event){
  //     this.setState({
  //         [event.target.name]: event.target.value
  //     });
  // }
  const navigate = useNavigate();
  async function handleSubmit() {
    // preventDefault();
    await auth.sendPasswordResetEmail(email).then(
      async (result) => {
        // this.setState({
        //   email: ""
        // });
        setEmail("");
        alert("Check you email and follow the reset-password link");
        navigate("/login");
      },
      function (error) {
        alert(error);
      }
    );
  }

  return (
    <form onSubmit={() => handleSubmit}>
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
        <input type="submit" value="Subscribe!" />
      </div>
    </form>
  );
}
