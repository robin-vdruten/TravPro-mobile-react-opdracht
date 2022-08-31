import { Marker, MarkerClusterer } from "@react-google-maps/api";
import React, { useCallback, useRef } from "react";

function Markermap(props) {
  const markerstest = [];
  const markerRef = useRef(null);
  const lng = props.lng;
  const lat = props.lat;

  const markers = [lat, lng];

  const onMarkerLoad = useCallback((marker) => {
    markerRef.current = marker;
  });

  for (let i = 0; i < markers[1].length; i++) {
    markerstest.push({ lat: JSON.parse(lat[i]), lng: JSON.parse(lng[i]) });
  }

  const options = {
    // foto's voor de markercluster
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  return (
    <>
      <MarkerClusterer options={options}>
        {(clusterer) =>
          markerstest.map((markerstest) => (
            <Marker
              onLoad={onMarkerLoad}
              draggable
              position={markerstest}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    </>
  );
}

export default Markermap;
