import React, { useState } from "react";
import "./App.css";
import Googlemaps from "./Googlemaps";
import Places from "./Places";

function App() {
  const [data, setData] = useState([]);
  const [center, setCenter] = useState([]);
  const [location, setLocation] = useState([]);

  return (
    <div className="App">
      <div className="main">
        <div className="left">
          <Places
            setDatamap={setData}
            locationmap={location}
            setCenter={setCenter}
          ></Places>
        </div>
        <div className="right">
          {
            <Googlemaps
              lat={data.map((item) => item.latitude)}
              lng={data.map((item) => item.longitude)}
              center={center}
              setLocation={setLocation}
              zoom={8}
            ></Googlemaps>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
