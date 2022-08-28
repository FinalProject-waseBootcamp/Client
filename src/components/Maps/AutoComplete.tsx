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
  const handleSelect = async (description: string): Promise<void> => {
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
    await doing();
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
        mapStore.openInfo=false;
        mapStore.center= { lat:newMarker.lat,lng:newMarker.lng };
        markerStore.addMarker(newMarker);
        mapStore.openInfo=true;
        debugger;
        navigate(`/system/welcome/${name}/${uid}`);
      }
    });
  };

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return (
      <>
        {suggestions}
        <li className="logo">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
          />
        </li>
      </>
    );
  };

  return (
    <div className="App">
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          style={{ width: 300, maxWidth: "90%" }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}