import React from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Container } from "@mui/system";
import axios from "axios";
import { System } from "../../utils/modals";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import Maps from "../Maps/Maps";
import markerStore from "../../store/markerStore";

export default function MySystem() {
  const auth = getAuth();
  const user = auth.currentUser;
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

  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!]);
  };
  return (
    <>
      <h1>WELCOME TO {name} SYSTEM</h1>
      {/* here customers can search for their closest location of the object 👇*/}
      {/* <Container id="container"> */}
      {/* <h3>locations</h3> */}
      <nav className="main">
        <div id="mapDiv">
          <Maps />
        </div>
        {/* </Container> */}
        {/* user can become location_user by contribute his object and define his location 👇*/}
        <div id="markerList">
          <ul>
            {markerStore.markers.map((marker, i) => {
              return (
                <div key={i}>
                  <li>
                    {marker.name} | {marker.address}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </nav>
      <div id="contributeDiv">
        <h5>HAVE THAT OBJECT TOO ? SIGN IN AND PEOPLE WILL BE HELPED BY YOU</h5>
        <Button>SIGN IN TO ADD LOCATION</Button>
      </div>
      {/* for admin only 👇*/}
      {/* {user?.uid&&
      <Button
        variant="contained"
        id="leftTopButton"
        onClick={() => navigate("/adminSystems")}
      >
        My systems
      </Button>} */}
    </>
  );
}
