import { ChangeEvent, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import '../../css/Marker.css'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  LatLng,
//   LatLng,
} from "use-places-autocomplete";
// import { LatLng } from "google-maps";
import { useNavigate } from "react-router";
import mapStore from "../../store/mapStore";
import { Position } from "../../utils/modals";
import markerStore from "../../store/markerStore";

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

  function degreesToRadians(degrees:number){
    return degrees * Math.PI / 180;
}
  function getDistanceBetweenPoints(lat1:number, lng1:number, lat2:number, lng2:number){
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
}

  function find_closest_marker(lat:number,lng:number) {
    debugger
    let distances = [];
    let closest = -1;
    debugger
    for (let i = 0; i < markerStore.markers.length; i++) {
        debugger
        // const d = google.maps.geometry.spherical.computeDistanceBetween(position, latlng);
        const d = getDistanceBetweenPoints(markerStore.markers[i].lat,markerStore.markers[i].lng,lat,lng)
        debugger
        distances[i] = d;
        if (closest == -1 || d < distances[closest]) {
            debugger
            closest = i;
        }
        debugger
    }
    alert('Closest location is ' + markerStore.markers[closest].address);
}

  const handleSelect = async (description: string): Promise<void> => {
    const doing = () => {
      setValue(description, false);
      clearSuggestions();
      debugger;
      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => 
            getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
          debugger
          find_closest_marker(lat,lng);
        })
        .catch((error) => {
          debugger;
          console.log("😱 Error: ", error);
        });
    };
    await doing();

  };

  return (
    <div className="App">
      <Combobox onSelect={handleSelect} aria-labelledby="demo">
        <ComboboxInput
          style={{ width: 300, maxWidth: "90%" }}
          defaultValue={mapStore.currentAddress.address}
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
