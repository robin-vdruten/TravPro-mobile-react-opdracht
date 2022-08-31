import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import Markermap from "./Markermap";

function Googlemap(props) {
  const [map, setMap] = React.useState(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const centermarker = props.center;

  const center = {
    lat: 36.1080227,
    lng: -115.155555,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBpfyrBMTrgHH3YnaGHxfjEN_w7OXBJoqc",
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    console.log(map.lat);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function handleZoomChanged() {
    console.log(this.getZoom());
  }

  function handeCenterChanged() {
    console.log(this.getCenter());
  }

  const handleBoundsChanged = () => {
    if (map) {
      let bounds = map.getBounds();
      let ne = bounds.getNorthEast();
      let sw = bounds.getSouthWest();
      getMapData(ne.toString(), sw.toString());
    }
  };

  async function getMapData(ne, sw) {
    const lat1 = ne.slice(1).split(",", 1);
    const lon1 = ne.slice(0, -1).split(",").pop();
    const lat2 = sw.slice(1).split(",", 1);
    const lon2 = sw.slice(0, -1).split(",").pop();
    let result = await fetch(
      "https://travpro.yourworldapps.nl/API/app/v2/listings.php?app=las-vegas&lat1=" +
        lat1 +
        "&lat2=" +
        lat2 +
        "&lon1=" +
        lon1 +
        "&lon2=" +
        lon2 +
        "?category=&query="
    );
    result = await result.json();
    props.setLocation(result);
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centermarker ? props.center : center}
      zoom={props.zoom}
      onLoad={onLoad}
      onCenterChanged={handeCenterChanged}
      onZoomChanged={handleZoomChanged}
      onBoundsChanged={handleBoundsChanged}
      onUnmount={onUnmount}
    >
      <></>
      <Markermap lat={props.lat} lng={props.lng}></Markermap>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Googlemap);
