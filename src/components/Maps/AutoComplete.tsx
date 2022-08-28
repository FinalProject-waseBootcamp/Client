import { ChangeEvent, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import swal from "sweetalert";
import AddMarkerForm from "./AddMarkerForm";
import "../../css/Marker.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useNavigate, useParams } from "react-router";
import markerStore from "../../store/markerStore";
import { Marker } from "../../utils/modals";
import axios from "axios";
import systemStore from "../../store/systemStore";
import userStore from "../../store/userStore";
import { getAuth } from "firebase/auth";
import mapStore from "../../store/mapStore";
import { IconButton, InputBase, Paper } from "@mui/material";

export default function MyAutoComplete() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const navigate = useNavigate();
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const { name, uid } = useParams();

  let newMarker: Marker;
  const handleSelect = (description: any) => () => {
    const doing = () => {
      setValue(description, false);
      clearSuggestions();
      debugger;
      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
          console.log("userStore.user: ", userStore.user);
          debugger;
          newMarker = {
            systemId: systemStore.currentSystem?._id || uid,
            managerId: userStore.user?.uid,
            lat: lat,
            lng: lng,
            address: description,
            city:"city",
            name: "name",
            description: "description",
            phone: "phone",
          };
          debugger;
        })
        .catch((error) => {
          debugger;
          console.log("😱 Error: ", error);
        });
    };
     doing();
    swal({
      title: `Want to define ${description} as your location?`,
      buttons: ["Cancel", "Ok"],
    }).then(async (willDefine) => {
      debugger;
      if (willDefine) {
        debugger;
        try {
          await axios.post("http://localhost:3333/marker", newMarker);
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
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });
  return (
    // <div className="App">
    //   <Combobox onSelect={handleSelect} aria-labelledby="demo">
    //     <ComboboxInput
    //       style={{ width: 300, maxWidth: "90%" }}
    //       value={value}
    //       onChange={handleInput}
    //       disabled={!ready}
    //     />
    //     {/* <ComboboxPopover> */}
    //       {status === "OK" && <div> {renderSuggestions()}</div>}
    //     {/* </ComboboxPopover> */}
    //   </Combobox>
    // </div>
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 500,
        }}
      >
        {/* <div ref={ref}> */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="New Location"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={value}
          onChange={handleInput}
          disabled={!ready}

        />
      </Paper>
      {status === "OK" && <div>{renderSuggestions()}</div>}
    </>
  );
}