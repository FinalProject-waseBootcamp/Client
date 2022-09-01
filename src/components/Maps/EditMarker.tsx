import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import markerStore from "../../store/markerStore";
import { Marker as MarkerUtil } from "../../utils/modals";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import MyAutoComplete from "./AutoComplete";
import userStore from "../../store/userStore";
import systemStore from "../../store/systemStore";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { post } from '../../api/marker';
import mapStore from '../../store/mapStore';
import { useNavigate, useParams } from "react-router";
import { _endAction } from "mobx";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
const EditMarker = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [openDialog, setOpenDialog] = useState(true);
    const [color, setColor] = useColor("hex", "#121212");
    const inputName = useRef<HTMLInputElement>();
    const inputDescription = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputNotes = useRef<HTMLInputElement>();
    const inputcolor = useRef<HTMLInputElement>();



    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        debugger;
        setOpenDialog(false);
    };

    const navigate = useNavigate();
    const { name, uid } = useParams();
    const edit = () => {
        debugger;
        const newMarker: any = {
            systemId: systemStore.currentSystem?._id || "",
            managerId: userStore.user?.uid,
            name: inputName.current?.value,
            description: inputDescription.current?.value,
            color: color.hex,
            notes: inputNotes.current?.value,
            email: inputEmail.current?.value,
            phone: inputPhone.current?.value,
            address: markerStore.address.address,
            lng: markerStore.address.lng,
            lat: markerStore.address.lat,
        }
        swal({
            title: `Want to define ${markerStore.address.address} as your location?`,
            buttons: ["Cancel", "Ok"],
        }).then(async (willDefine) => {
            debugger;
            if (willDefine) {
                debugger;
                try {
                    await post(newMarker);
                } catch (err) {
                    alert("Error: " + err);
                }
                debugger;
                mapStore.openInfo = false;
                mapStore.center = { lat: newMarker.lat, lng: newMarker.lng };
                markerStore.addMarker(newMarker);
                mapStore.openInfo = true;
                debugger;
                navigate(`/system/welcome/${name}/${uid}`);
            }
        });
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
        <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"add your details location?"}
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
                <DialogContentText sx={{ textAlign: "center" }}>
                    < MyAutoComplete />
                    <React.Fragment>
                        <Grid item xs={4}>
                            <TextField inputRef={inputName} id="filled-basic" label="name" variant="filled" defaultValue={markerStore.currentMarker.name} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField inputRef={inputDescription} id="filled-basic" label="description" variant="filled" defaultValue={markerStore.currentMarker.description}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField inputRef={inputPhone} id="filled-basic" label="phone" variant="filled" defaultValue={markerStore.currentMarker.phone} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField inputRef={inputEmail} id="filled-basic" label="email" variant="filled" defaultValue={markerStore.currentMarker.email}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField inputRef={inputcolor} id="filled-basic" label="color" variant="filled" defaultValue={markerStore.currentMarker.color}/>
                        </Grid>
                        <br />
                        <ColorPicker
                            width={300}
                            height={70}
                            color={color}
                            onChange={setColor}
                            hideHSV
                            dark
                        />
                        <Grid item xs={4} >
                            <TextareaAutosize
                                // inputRef={inputNotes}
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
                <Button onClick={edit} autoFocus>
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="save">
                    </IconButton>
                    Save
                </Button>
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        </Paper>
    );
}
export default EditMarker
