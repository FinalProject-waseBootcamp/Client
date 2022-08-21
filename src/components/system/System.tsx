import React from "react";
import { Search, useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import  {Container}  from "@mui/system";
import axios from "axios";
import { System } from "../../utils/modals";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/icons-material/Menu";
// import Directions  from "@material-ui/icons";
// import Search from "@mui/icons-material/Search";
// import Directions from "@mui/icons-material/Directions";

export default function MySystem() {
  const { name, uid } = useParams();
  const navigate = useNavigate();
  const [currentSystem, setCurrentSystem] = React.useState<System>();

  const getCurrentSystem = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/system/${uid}`);
      setCurrentSystem(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCurrentSystem();
  }, []);

  return (
    <>
      <h1>WELCOME TO {name} SYSTEM</h1>
      {/* here customers can search for their closest location of the object 👇*/}
      <Container id="container">
        <h3>locations</h3>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            {/* <Menu /> */}
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            {/* <Search /> */}
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            {/* <Directions /> */}
          </IconButton>
        </Paper>
      </Container>
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
