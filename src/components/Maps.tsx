// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import GoogleMapReact from 'google-map-react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Marker from './Marker';

// const mapStyles = {
//     width: '60%',
//     height: '90%'
// };
// interface Film {
//     title: string;
//     year: number;
// }

// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }

// const Maps: React.FC = (props: any) => {
//     const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
//     const [open, setOpen] = React.useState(false);
//     const [options, setOptions] = React.useState<readonly Film[]>([]);
//     const [zoom, setZoom] = useState(11);
//     const loading = open && options.length === 0;

//     // const getMapOptions = (maps: any) => {
//     //     return {
//     //         disableDefaultUI: true,
//     //         mapTypeControl: true,
//     //         streetViewControl: true,
//     //         styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
//     //     };
//     // };
//     React.useEffect(() => {
//         // let active = true;
//         //   if (!loading) {
//         //     return;
//         //   }

//         //   (async () => {
//         //     await sleep(1e3); // For demo purposes.

//         //     if (active) {
//         //       setOptions([...topFilms]);
//         //     }
//         //   })();

//         //   return () => {
//         //     active = false;
//         //   };
//         // }, [loading]);

//         // React.useEffect(() => {
//         //   if (!open) {
//         //     setOptions([]);
//         //   }
//         // }, [open]);
//     })

//     return (
//         <>
//             <Box sx={{ flexGrow: 1 }}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={6} md={8}>
//                         <GoogleMapReact

//                             bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
//                             defaultCenter={center}
//                             defaultZoom={zoom}
//                         >
//                             <Marker
//                                 lat={11.0168}
//                                 lng={76.9558}
//                                 text="My Marker"
//                             />
//                         </GoogleMapReact>
//                     </Grid>
//                     <Grid item xs={6} md={4}>
//                         <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
//                             search location business on the system
//                         </Typography>
//                         <Autocomplete sx={{ textAlign: 'center', width: 300 }}
//                             id="asynchronous-demo"
//                             open={open}
//                             onOpen={() => {
//                                 setOpen(true);
//                             }}
//                             onClose={() => {
//                                 setOpen(false);
//                             }}
//                             isOptionEqualToValue={(option, value) => option.title === value.title}
//                             getOptionLabel={(option) => option.title}
//                             options={options}
//                             loading={loading}
//                             renderInput={(params) => (
//                                 <TextField
//                                     {...params}
//                                     label="Asynchronous"
//                                     InputProps={{
//                                         ...params.InputProps,
//                                         endAdornment: (
//                                             <React.Fragment>
//                                                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                                                 {params.InputProps.endAdornment}
//                                             </React.Fragment>
//                                         ),
//                                     }}
//                                 />
//                             )}
//                         />
//                     </Grid>
//                 </Grid>
//             </Box>
//         </>
//     );
// }
// const topFilms = [
//     { title: 'example', year: 2020 },
// ];

// export default Maps
// import React, { useState } from 'react';
// import GoogleMapReact from 'google-map-react';
// import Marker from './Marker';

// const Maps = (props: any) => {
//     const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
//     const [zoom, setZoom] = useState(11);
//     return (
//         <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw' }}
//           defaultCenter={center}
//           defaultZoom={zoom}
//         >
//           <Marker
//             lat={11.0168}
//             lng={76.9558}
//             name="My Marker"
//             color="blue"
//           />
//         </GoogleMapReact>
//       </div>
//     );
// }

// export default Maps;
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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

const SimpleMap: React.FC = (props: any) => {
  useEffect(() => {
    getMarkers();
  }, []);

  const getMarkers = () => {};

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
            <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="h6"
              component="div"
            >
              here you can search location business of your system
            </Typography>
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
                    placeholder="Search Google Maps"
                    InputProps={{
                      "aria-label": "search google maps",
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SimpleMap;

// const locations = [
//   { lat: -31.56391, lng: 147.154312 },
//   { lat: -33.718234, lng: 150.363181 },
//   { lat: -33.727111, lng: 150.371124 },
//   { lat: -33.848588, lng: 151.209834 },
//   { lat: -33.851702, lng: 151.216968 },
//   { lat: -34.671264, lng: 150.863657 },
//   { lat: -35.304724, lng: 148.662905 },
//   { lat: -36.817685, lng: 175.699196 },
//   { lat: -36.828611, lng: 175.790222 },
//   { lat: -37.75, lng: 145.116667 },
//   { lat: -37.759859, lng: 145.128708 },
//   { lat: -37.765015, lng: 145.133858 },
//   { lat: -37.770104, lng: 145.143299 },
//   { lat: -37.7737, lng: 145.145187 },
//   { lat: -37.774785, lng: 145.137978 },
//   { lat: -37.819616, lng: 144.968119 },
//   { lat: -38.330766, lng: 144.695692 },
//   { lat: -39.927193, lng: 175.053218 },
//   { lat: -41.330162, lng: 174.865694 },
//   { lat: -42.734358, lng: 147.439506 },
//   { lat: -42.734358, lng: 147.501315 },
//   { lat: -42.735258, lng: 147.438 },
//   { lat: -43.999792, lng: 170.463352 },
// ];
// const infoWindow = new google.maps.InfoWindow({
//   content: "",
//   disableAutoPan: true,
// });
//  // Create an array of alphabetical characters used to label the markers.
//  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//    // Add some markers to the map.
//    const markers = locations.map((position, i) => {
//     const label = labels[i % labels.length];
//     const marker = new google.maps.Marker({
//       position,
//       label,
//     });

//     // markers can only be keyboard focusable when they have click listeners
//     // open info window when marker is clicked
//     marker.addListener("click", () => {
//       infoWindow.setContent(label);
//       infoWindow.open(SimpleMap, marker);
//     });

//     return marker;
//   });
//   const markerCluster = new MarkerClusterer({ SimpleMap, markers });

//   // Add a marker clusterer to manage the markers.
//   new MarkerClusterer({ markers, SimpleMap });
