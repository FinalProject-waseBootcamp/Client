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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useNavigate, useParams } from "react-router";
import markerStore from "../../store/markerStore";
import { Marker } from "../../utils/modals";

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
  // useEffect(() =>{

  // })
  const { name, uid } = useParams();

  let newMarker: Marker;
  const handleSelect = async (description: string): Promise<void> => {
    // =>() => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    const doing = () => {
      setValue(description, false);
      clearSuggestions();
      debugger;
      // Get latitude and longitude via utility functions
      getGeocode({ address: description})
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
          debugger;
         newMarker = { lat: lat, lng: lng, address: description, name: "ora" };
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
        markerStore.addMarker(newMarker);
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
