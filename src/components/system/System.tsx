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
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function MySystem() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { name , uid } : any = useParams();

  const navigate = useNavigate();
  const [currentSystem, setCurrentSystem] = React.useState<any>();

  const getCurrentSystem = async () => {
    try {
      const response = await getById(uid);
      const currentSystem=response;
      setCurrentSystem(currentSystem);
      systemStore.currentSystem=currentSystem;
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
      <h1>WELCOME TO {currentSystem?.name||name} SYSTEM</h1>
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
        <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
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
