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
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';


const mapStyles = {
    width: '5%',
    height: '50%'
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
        getMarkers()
    }, [])

    const getMarkers = () => {

    }

    const getMapOptions = (maps: any) => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
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
                    <Grid item xs={6} md={8}  >
                        <GoogleMapReact
                          //  style={mapStyles}
                            bootstrapURLKeys={{ key: 'AIzaSyAMPFO6Sc4Ihhl2ciCChm6Am1QVlMtDMb0' }}
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
                        <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h4" component="div">
                            here you can search  location business of your system
                        </Typography>

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
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            getOptionLabel={(option) => option.title}
                            options={options}
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Asynchronous"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default SimpleMap;




