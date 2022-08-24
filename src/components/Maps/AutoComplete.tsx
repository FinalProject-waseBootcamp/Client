import { ChangeEvent } from "react";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import "@reach/combobox/styles.css";
import swal from "sweetalert";
import AddMarkerForm from "./AddMarkerForm";
import usePlacesAutocomplete, {getGeocode,getLatLng,} from "use-places-autocomplete";


export default function MyAutoComplete() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSelect =
    //   (val: string): void => {
    // setValue(val, false);
    // alert("in select :" + val);
    (description: string): void => {
      // =>() => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      //   clearSuggestions();
      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });

      swal({
        title: `Want to define ${description} as your location?`,
        buttons: ["Cancel", "Ok"],
        dangerMode: true,
      }).then(async (willDDefine) => {
        if (willDDefine) {
          return (
            <>
              <p>enter details for this marker</p>
              <AddMarkerForm />
            </>
          );
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
