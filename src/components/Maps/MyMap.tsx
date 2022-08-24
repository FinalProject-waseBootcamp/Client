// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import React from "react";
// import useDeepCompareEffectForMaps from "use-deep-compare-effect";
// import Marker from "./MyMarker";

// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };

// interface MapProps extends google.maps.MapOptions {
//   style: { [key: string]: string };
//   onClick?: (e: google.maps.MapMouseEvent) => void;
//   onIdle?: (map: google.maps.Map) => void;
//   children?: any;
// }

// const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
// const [zoom, setZoom] = React.useState(3); // initial zoom
// const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
//   lat: 0,
//   lng: 0,
// });

// const onClick = (e: google.maps.MapMouseEvent) => {
//   // avoid directly mutating state
//   setClicks([...clicks, e.latLng!]);
// };

// const onIdle = (m: google.maps.Map) => {
//   console.log("onIdle");
//   setZoom(m.getZoom()!);
//   setCenter(m.getCenter()!.toJSON());
// };

// const Map: React.FC<MapProps> = ({
//   onClick,
//   onIdle,
//   children,
//   style,
//   ...options
// }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [map, setMap] = React.useState<google.maps.Map>();

//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//   }, [ref, map]);

//   useDeepCompareEffectForMaps(() => {
//     if (map) {
//       map.setOptions(options);
//     }
//   }, [map, options]);

//   React.useEffect(() => {
//     if (map) {
//       ["click", "idle"].forEach((eventName) =>
//         google.maps.event.clearListeners(map, eventName)
//       );

//       if (onClick) {
//         map.addListener("click", onClick);
//       }

//       if (onIdle) {
//         map.addListener("idle", () => onIdle(map));
//       }
//     }
//   }, [map, onClick, onIdle]);

//   return (
//     <>
//       <div ref={ref} style={style} />
//       {/* {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           // set the map prop on the child component
//           return React.cloneElement(child, { map });
//         }
//       })} */}
//     </>
//   );
// };
// <Wrapper apiKey={"AIzaSyDuj7uje4eVa30MdHZOmm1sfyfKF22AKnE"} render={render}>
//   <Map style={{}}>
//     {/* <Marker  /> */}
//     {clicks.map((latLng, i) => (
//       <Marker key={i} position={latLng} />
//     ))}
//   </Map>
// </Wrapper>;
export{}
