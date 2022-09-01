import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import Directions from "@mui/icons-material/Directions";
import { useNavigate, useParams } from "react-router";
import Marker from "./Marker";
import { Marker as MarkerModal, Position, Roles } from "../../utils/modals";
import markerStore from "../../store/markerStore";
import { SocketAddress } from "net";
import MyAutoComplete from "./SearchLocation";
import mapStore from "../../store/mapStore";
import AddMarker from "./AddMarker";
import { deleteM } from "../../api/marker";
import swal from "sweetalert";
import { observer } from "mobx-react";
import EditMarker from "./EditMarker";
import ManagerStore from "../../store/mangersStore";
interface Film {
  title: string;
  year: number;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Maps: React.FC = (props: any) => {
  const { name, uid } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [address, setAddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState<Position>({
    lat: mapStore.currentAddress.lat,
    lng: mapStore.currentAddress.lng,
  });
  const [center, setCenter] = useState<Position>(currentLocation);
  const [zoom, setZoom] = useState<number>(15);
  const [markers, setMarkers] = useState<MarkerModal[]>([
    ...markerStore.markers,
  ]);
  const marker_ref = useRef<HTMLInputElement>();
  const [activeMarker, setActiveMarker] = useState<MarkerModal | null>(null);

  const onInfoWindowClose = () => {
    mapStore.openInfo = false;
    markerStore.currentMarker = {
      lat: 0,
      lng: 0,
      name: "string",
      address: "string",
      city: "string",
      _id: "string",
    };
    setOpenInfo(false);
    setActiveMarker(null);
  };
  const onInfoWindowOpen = () => {
    setActiveMarker(markerStore.currentMarker);
    setOpenInfo(true);
  };

  useEffect(() => {
    setAddress(mapStore.currentAddress.address);
    setCurrentLocation({
      lat: mapStore.currentAddress.lat,
      lng: mapStore.currentAddress.lng,
    });
  }, [mapStore.currentAddress]);
  useEffect(() => {
    debugger;
    mapStore.openInfo ? onInfoWindowOpen() : onInfoWindowClose();
  }, [mapStore.openInfo]);
  useEffect(() => {
    debugger;
    setMarkers(markerStore.markers);
  }, [markerStore.markers]);
  useEffect(() => {
    debugger;
    setCenter(mapStore.center);
    setZoom(mapStore.zoom);
    setTimeout(() => {
      setZoom(15);
    }, 5000);
  }, [mapStore.center, mapStore.zoom]);

  const getMapOptions = (maps: any) => {
    return {
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
        console.log("lat: " + lat + ", lng: " + lng);
        const position = { lat, lng };
        setCurrentLocation(position);
        mapStore.currentAddress.lat = lat;
        mapStore.currentAddress.lng = lng;
        mapStore.center = { lat: lat, lng: lng };
        await fetch(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            lng +
            "&key=AIzaSyDuj7uje4eVa30MdHZOmm1sfyfKF22AKnE"
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res.results[0]);
            return res.results[0];
          })
          .then((results) => {
            debugger;
            mapStore.currentAddress.address = results.formatted_address;
            setAddress(results.formatted_address);
            navigate(`/system/welcome/${name}/${uid}`);
          });
      }
    );
  };

  const handleOpen = () => {
    debugger;
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen2 = () => {
    debugger;
    setOpenModal2(true);
  };
  const handleClose2 = () => {
    setOpenModal2(false);
  };

  const editMarker = async (item: MarkerModal) => {};
  const deleteMarker = async (item: MarkerModal) => {
    swal({
      title: "Are you sure?",
      text: " you want to delete this marker?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteM(item._id);
        if (res == 200) {
          swal("Poof! Your marker deleted!", {
            icon: "success",
          });
        }
      } else {
        swal("Your marker is safe!");
      }
    });
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", margin: 0 }}>
        <Grid
          container
          spacing={2}
          sx={{ height: "100%", width: "100%", justifyItems: "right" }}
        >
          <Grid item md={6} sx={{ height: "70vh", width: "100vh" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAMPFO6Sc4Ihhl2ciCChm6Am1QVlMtDMb0",
              }}
              center={center}
              zoom={zoom}
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            >
              {markerStore.markers?.map((marker) => (
                <Marker
                  key={marker.lat + marker.lng}
                  lat={marker.lat}
                  lng={marker.lng}
                  name={marker.name}
                  color={marker.color}
                  address={marker.address}
                />
              ))}
            </GoogleMapReact>
          </Grid>
          <Grid item xs={6} md={4}>
            <div>
              <h4>your current location:</h4>
              <h6>({currentLocation.lat + " , " + currentLocation?.lng})</h6>
              <h5>{address}</h5>
            </div>
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
              <Paper component="form" sx={{ p: "1vw 2vw" }}>
                Location to search nearBy
                <MyAutoComplete />
              </Paper>
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
              {/* {ManagerStore.currentManager &&
                ManagerStore.currentManager.role === Roles.ADMIN && ( */}
                  <Button
                    variant="contained"
                    sx={{ padding: 2, width: "5vw" }}
                    onClick={handleOpen}
                  >
                    Add Location🎯
                  </Button>
                {/* // )} */}
            </Paper>
            {openModal && <AddMarker />}
            {openInfo && (
              <div id="markerInfo">
                <h2>marker info</h2>
                <h3>{markerStore.currentMarker?.name}</h3>
                <h4>{markerStore.currentMarker?.description}</h4>
                <h4>{markerStore.currentMarker?.notes}</h4>
                <h4>{markerStore.currentMarker?.address}</h4>
                <h4>
                  {markerStore.currentMarker?.email}
                  {markerStore.currentMarker?.phone}
                </h4>
                <Button
                  onClick={() => {
                    deleteMarker(markerStore.currentMarker);
                  }}
                >
                  Delete
                </Button>
                <Button onClick={handleOpen2}>
                  Edit
                  {openModal2 && <EditMarker />}
                </Button>
                <Button onClick={onInfoWindowClose}>close</Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default observer(Maps);
