import React from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Container } from "@mui/system";
import { Marker, Position, System } from "../../utils/modals";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import Maps from "../Maps/Maps";
import markerStore from "../../store/markerStore";
import mapStore from "../../store/mapStore";
import { Box, Button, ListItemButton, Modal } from "@mui/material";
import systemStore from "../../store/systemStore";
import { getById } from "../../api/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Request from "../Maps/Request";

export default function MySystem() {
  console.log("MySystem");
  const auth = getAuth();
  const user = auth.currentUser;
  const { name, uid }: any = useParams();

  const navigate = useNavigate();
  const [currentSystem, setCurrentSystem] = React.useState<System>();
  const [cities, setCities] = React.useState<string[]>();
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
  console.log("handleOpen");
    setOpen(true);
  };
  const handleClose = () => {
  console.log("handleClose");
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "43%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getCurrentSystem = async () => {
    try {
  console.log("getCurrent System");
      const response = await getById(uid);
      const currentSystem: System = response;
      systemStore.currentSystem = currentSystem;
      setCurrentSystem(currentSystem);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    debugger;
  console.log("useEffect");
    getCurrentSystem();
    sortMarkersByCities();
  }, []);

  const sortMarkersByCities = async () => {
    debugger;
  console.log("sortMarkersByCities");
    let arr: string[] = [];
    markerStore.markers.map((marker) => {
      if (!arr.includes(marker.city)) {
        arr.push(marker.city);
      }
    });
    setCities(arr);
    console.log(arr);
    console.log(cities);
    debugger;
  };

  // const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);

  // const onClick = (e: google.maps.MapMouseEvent) => {
  //   setClicks([...clicks, e.latLng!]);
  // };
  const handleClick = (item: Marker) => {
    console.log("handleClick");
    debugger;
    mapStore.center = { lat: item.lat, lng: item.lng };
    markerStore.currentMarker = item;
    mapStore.openInfo = true;
    navigate(`/system/welcome/${currentSystem?.name}/${uid}`);
  };

  return (
    <>
      <h1>WELCOME TO {currentSystem?.name} SYSTEM</h1>
      {/* here customers can search for their closest location of the object 👇*/}
      {/* <Container id="container"> */}
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
            {cities?.length &&
              cities?.map((city: string, i: number) => (
                <li key={`section-${i}`}>
                  <ul>
                    <ListSubheader>{city}</ListSubheader>
                    {markerStore.markers.map(
                      (item: Marker, i: number) =>
                        item.city === city && (
                          <>
                            <ListItemButton
                              key={`item-${i}-${item}`}
                              onClick={() => handleClick(item)}
                            >
                              <ListItemText primary={item.address} />
                            </ListItemButton>
                          </>
                        )
                    )}
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
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Request></Request>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
      <div id="contributeDiv">
        <h5>HAVE THAT OBJECT TOO ? SIGN IN AND PEOPLE WILL BE HELPED BY YOU</h5>
        <Button onClick={handleOpen}>SIGN UP TO ADD LOCATION</Button>
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
