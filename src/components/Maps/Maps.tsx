
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Marker from "./Marker";
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
import { useNavigate } from "react-router";
const mapStyles = {
  width: "3vw",
  height: "5vh",
};
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
  const navigate = useNavigate();

  useEffect(() => {
    getMarkers();
  }, []);

  const getMarkers = () => { };

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
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Film[]>([]);
  const loading = open && options.length === 0;
  const [center, setCenter] = useState({ lat: 31.0461, lng: 34.8516 });
  const [zoom, setZoom] = useState(11);
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
              <Marker
                lat={11.0168}
                lng={76.9558}
                name="My Marker"
                color="blue"
              />
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
                onClick={() => navigate("/addLocation")}
              >
                Add Location🎯
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Maps;
