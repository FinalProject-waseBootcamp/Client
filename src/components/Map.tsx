import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useDeepCompareEffectForMaps from 'use-deep-compare-effect'
import Maps from './Maps'
interface MapProps extends google.maps.MapOptions {
    // style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: any
}
const render = (status: Status) => {
    return <h1>{status}</h1>;
};



const Map: React.FC<MapProps> = ({ onClick, onIdle, children, ...options }) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const google = window.google

    React.useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (ref.current && !map) {
            // console.log("map is", window.google.maps)
            setMap(new google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    return <div ref={ref} />;
};
<Wrapper apiKey={"AIzaSyAcibzCa3ilUV5eZNEQpjqLmWzdm35tymw"} render={render}>
    <Maps >
    {/* <Marker position={position} /> */}
  </Maps>
</Wrapper>
export default Map;



