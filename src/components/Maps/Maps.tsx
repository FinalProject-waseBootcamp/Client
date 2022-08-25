import React, { useEffect, useState } from "react";
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
import { Marker as Mark} from "../../utils/modals";
import  Marker  from "./Marker";
import markerStore from "../../store/markerStor";
// const mapStyles = {
//   width: "3vw",
//   height: "5vh",
// };
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
  position: 'absolute',
  top: '70%',
  left: '70%',
  transform: 'translate(-50%, -50%)',
  width: 100,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Maps: React.FC = (props: any) => {
  const navigate = useNavigate();
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Film[]>([]);
  const loading = open && options.length === 0;
  const [center, setCenter] = useState({ lat: 32.0461, lng:35.5166 });
  const [zoom, setZoom] = useState(9);
  const [openModal, setOpenModal] = React.useState(false);
 
  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };
  const getMapOptions = (maps: any) => {
    return {
      onClick:{onClick},
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: "poi", elementType: "labels",stylers: [{ visibility: "on" }],},],
    };
  };
  useEffect(() => { console.log(clicks); }, [clicks] )
    const handleClose = () => setOpenModal(false);
  const handleOpen = () =>{
    debugger
    setOpenModal(true);
  } 
  return (
    <>
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item md={6} sx={{ height: "70vh" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAMPFO6Sc4Ihhl2ciCChm6Am1QVlMtDMb0",
              }}
              defaultCenter={center}
              defaultZoom={zoom}
              options={getMapOptions}
            >
              {/* <Marker */}
                {/* // lat={11.0168}
                // lng={76.9558}
                // position={center}
                // name="My Marker"
                // color="blue" */}
              {/* /> */}
              {markerStore.markers.map((marker) => (
                <Marker 
                lat={marker.lat}
                lng={marker.lng}
                name={marker.name}
                color={marker.color}
                 />
              ))}
            </GoogleMapReact>
          </Grid>
          <Grid item xs={6} md={4}>
            {/* <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="h4"
              component="div"
            >
              here you can search location business of your system
            </Typography> */}
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
              {/* <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          /> */}
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
              <Button
                variant="contained"
                // id="leftTopButton"
                onClick={handleOpen}
              >
                Add Location🎯
              </Button>
            </Paper>
            <Modal
                keepMounted
                open={openModal}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <AddLocation/>
                </Box>
            </Modal>
            <h3>
              {clicks.length === 0 ? "Click on map to add markers" : "Clicks"}
            </h3>
            {clicks.map((latLng, i) => (
              <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
            ))}
            <button onClick={() => setClicks([])}>Clear</button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Maps;
