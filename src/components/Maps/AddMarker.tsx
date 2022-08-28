/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import markerStore from '../../store/markerStore';
import { Marker as MarkerUtil } from '../../utils/modals';
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Directions from "@mui/icons-material/Directions";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import swal from 'sweetalert';
import { textAlign } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
const AddMarker = () => {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<readonly MarkerUtil[]>([]);
    const loading = open && options.length === 0;
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openDialog, setOpenDialog] = useState(false);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const [status, setStatus] = useState<string>("");
    const inputName = useRef<HTMLInputElement>();
    const inputDescription = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputNotes = useRef<HTMLInputElement>();
    const inputcolor = useRef<HTMLInputElement>();

    const inputNameMarker = useRef<HTMLInputElement>();

    const handleSelect = async () => {
        debugger;
    }

const handleClickOpen = () => {
    setOpenDialog(true);
};

const handleClose = () => {
    setOpenDialog(false);
};


const addMarker = () => {
    debugger;
    const newMarker: any = {
        // "manager_id": systemStore.systems.???,
        // "system_id": systemStore.systems.uid,
        // "lat": markerStore.markers.lat,
        // "address":
        // "name": inputName.current?.value,
        // "description": inputDescription.current?.value,
        // // "color":
        // "notes": inputNotes.current?.value,
        // "email": inputEmail.current?.value,
        // "phone": inputPhone.current?.value,
      
    }
    console.log(markerStore.markers)
    markerStore.addMarker(newMarker);  
    console.log(markerStore.markers)
    swal("saved!", "your location added!", "success");
    handleClose()
}
    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 420,
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
                    setOpen(true)

                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                onSelect={handleSelect}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Asynchronous"
                        inputRef={inputNameMarker}
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
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
            >
                <Directions />
            </IconButton>
            <Button variant="contained" onClick={handleClickOpen}>
                add Marker
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"add your details location?"}
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center"}}>
                    <DialogContentText>
                        <React.Fragment>
                            <Grid item xs={4}>
                                <TextField inputRef={inputName} id="filled-basic" label="name" variant="filled" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField inputRef={inputDescription} id="filled-basic" label="description" variant="filled" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField inputRef={inputPhone} id="filled-basic" label="phone" variant="filled" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField inputRef={inputEmail} id="filled-basic" label="email" variant="filled" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField inputRef={inputcolor} id="filled-basic" label="color" variant="filled" />
                            </Grid>
                            <br/>
                            <Grid item xs={4} >
                                <TextareaAutosize
                                //inputRef={inputNotes}
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="notes"
                                    style={{ width: 200 }}
                                />
                            </Grid>
                        </React.Fragment>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addMarker} autoFocus>
                        <IconButton type="button" sx={{ p: "10px" }} aria-label="save">
                            <SaveIcon />
                        </IconButton>
                        save
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}


export default AddMarker;