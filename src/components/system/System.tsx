import React from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Container } from "@mui/system";
export default function System() {
  const { name, uid } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <h1>WELCOME TO {name} SYSTEM</h1>
      {/* here customers can search for their closest location of the object 👇*/}
      <Container id="container">locations</Container>
      {/* user can become location_user by contribute his object and define his location 👇*/}
      <div id="contributeDiv">
        <h5>HAVE THAT OBJECT TOO ? SIGN IN AND PEOPLE WILL BE HELPED BY YOU</h5>
        <Button>SIGN IN</Button>
      </div>
      {/* for admin only 👇*/}
      <Button
        variant="contained"
        id="leftTopButton"
        onClick={() => navigate("/adminSystems")}
      >
        My systems
      </Button>
    </>
  );
}
