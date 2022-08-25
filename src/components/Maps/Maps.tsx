import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MyAutoComplete from "./AutoComplete";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import { useNavigate } from "react-router";
import AddLocation from "./AddLocation";
import { Marker as Mark, Position } from "../../utils/modals";
import Marker from "./Marker";
import markerStore from "../../store/markerStore";
import { SocketAddress } from "net";

interface Film {
  title: string;
  year: number;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const style = {
  position: "absolute",
  top: "70%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: 100,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Maps: React.FC = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Film[]>([]);
  const loading = open && options.length === 0;
  const [zoom, setZoom] = useState(13);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");
  const [currentLocation, seturrentLocation] = useState({
    lat: 32,
    lng: 30,
  });
  const [center, setCenter] = useState<Position>(currentLocation);
  const [markers, setMarkers] = useState<Mark[]>([...markerStore.markers]);
  const marker_ref = useRef<HTMLInputElement>();
  // const [activeMarker, setactiveMarker] = useState<any>();
  // const [selectedPlace, setselectedPlace] = useState<any>();
  // const [showingInfoWindow, setshowingInfoWindow] = useState<boolean>();
  // const onMarkerClick = (props: any, marker: any) => {
  //   setactiveMarker(marker);
  //   setselectedPlace(props);
  //   setshowingInfoWindow(true);
  // };

  // const onInfoWindowClose = () => {
  //   setactiveMarker(null);
  //   setshowingInfoWindow(false);
  // };

  // const onMapClicked = () => {
  //   if (showingInfoWindow) {
  //     setactiveMarker(null);
  //     setshowingInfoWindow(false);
  //   }
  // };

  useEffect(() => {
    debugger;
    setMarkers(markerStore.markers);
  }, [markerStore.markers]);

  const getMapOptions = (maps: any) => {
    return {
      // onClick: { onClick },
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    };
  };

  const apiIsLoaded = (map: any, maps: any) => {
    navigator?.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        console.log("lat"+lat+"lng"+lng)
        const position = { lat, lng };
        seturrentLocation(position);
        await fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDuj7uje4eVa30MdHZOmm1sfyfKF22AKnE"
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res.results[0]);
            return res.results[0];
          })
          .then((results) => {
            setAddress(results.formatted_address);
          });
      }
    );
  };

  const handleOpen = () => {
    debugger;
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);
  const searchMarker = async () => {
    debugger;
    console.log(marker_ref.current);
    const markName = marker_ref.current?.innerText || "";
    await markerStore.SearchMarker(markName);
    debugger;
    if (markerStore.currentMarker != null) {
      debugger;
      const pos: Position = {
        lat: markerStore.currentMarker?.lat,
        lng: markerStore.currentMarker?.lng,
      };
      setCenter(pos);
      setZoom(15);
    }
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Grid
          container
          spacing={2}
          sx={{ height: "100%", width: "100%", justifyItems: "right" }}
        >
          <Grid item md={6} sx={{ height: "70vh", width: "100vw" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAMPFO6Sc4Ihhl2ciCChm6Am1QVlMtDMb0",
              }}
              center={currentLocation}
              defaultZoom={zoom}
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
              // onClick={onMapClicked}
              // options={getMapOptions}
            >
              {markerStore.markers?.map((marker, i) => (
                <Marker
                  key={i}
                  lat={marker.lat}
                  lng={marker.lng}
                  name={marker.name}
                  color={marker.color}
                  address={marker.address}
                  // onClick={onMarkerClick}
                />
              ))}
            </GoogleMapReact>
          </Grid>
          <Grid item xs={6} md={4}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <Menu />
              </IconButton>
              <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                getOptionLabel={(option) => option.title}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search for a location "
                    inputRef={marker_ref}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <IconButton
                type="button"
                onClick={searchMarker}
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <Search />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <Directions />
              </IconButton>
              <Button
                variant="contained"
                // id="leftTopButton"
                onClick={handleOpen}
              >
                Add Location🎯
              </Button>
            </Paper>
            {openModal && <AddLocation />}
            <div>
              <h4>your current location:</h4>
              <h5>{currentLocation.lat + " , " + currentLocation.lng}</h5>
              <h5>{address}</h5>
            </div>
            {/* <Modal
                keepMounted
                open={openModal}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <AddLocation/>
                </Box>
            </Modal> */}
            {/* <h3>
              {clicks.length === 0 ? "Click on map to add markers" : "Clicks"}
            </h3>
            {clicks.map((latLng, i) => (
              <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
            ))}
            <button onClick={() => setClicks([])}>Clear</button> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Maps;
