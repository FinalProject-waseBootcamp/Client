import React from 'react';
import './Marker.css';

// const Marker = (props: any) => {
//     const { color, name, id } = props;
//     return (
//       <div>
//         <div
//           className="pin bounce"
//           style={{ backgroundColor: color, cursor: 'pointer' }}
//           title={name}
//         />
//         <div className="pulse" />
//       </div>
//     );
//   };


const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  
  React.useEffect(() => {
    if (!marker) {
        setMarker(new google.maps.Marker());
      }
      
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
  
    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
    
    return null;
  };
  export default Marker;