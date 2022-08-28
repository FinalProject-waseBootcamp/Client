import React from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Container } from "@mui/system";
import { Position, System } from "../../utils/modals";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import Maps from "../Maps/Maps";
import markerStore from "../../store/markerStore";
import mapStore from "../../store/mapStore";
import { Button } from "@mui/material";
import systemStore from "../../store/systemStore";
import { getById } from "../../api/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

export default function MySystem() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { name, uid }: any = useParams();

  const navigate = useNavigate();
  const [currentSystem, setCurrentSystem] = React.useState<any>();

  const getCurrentSystem = async () => {
    try {
      const response = await getById(uid);
      const currentSystem = response;
      setCurrentSystem(currentSystem);
      systemStore.currentSystem = currentSystem;
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCurrentSystem();
  }, []);

  // const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);

  // const onClick = (e: google.maps.MapMouseEvent) => {
  //   setClicks([...clicks, e.latLng!]);
  // };

  return (
    <>
      <h1>WELCOME TO {currentSystem?.name || name} SYSTEM</h1>
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
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {[0, 1, 2, 3, 4].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                  {[0, 1, 2].map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>
                      <ListItemText primary={`Item ${item}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
          {/* <ul>
            {markerStore.markers?.map((marker, i) => {
              const newCenter: Position = { lat: marker.lat, lng: marker.lng };
              return (
                <div
                  key={i}
                  //  onClick={mapStore.center=newCenter}
                >
                  <li>
                    {marker.name} | {marker.address}
                  </li>
                </div>
              );
            })}
          </ul> */}
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
