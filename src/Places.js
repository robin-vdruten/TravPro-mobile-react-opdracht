import React, { useState, useEffect } from "react";

function Places(props) {
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const onButtonClick = (lat, lng) => {
    const centermarker = {
      lat: JSON.parse(lat),
      lng: JSON.parse(lng),
    };
    console.log(centermarker);
    props.setCenter(centermarker);
  };

  const getAllData = (e) => {
    setIsActive((current) => !current);
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let result = await fetch(
      "https://travpro.yourworldapps.nl/API/app/v2/listings.php?app=las-vegas&lat1=36.5098445064823&lat2=35.74337885497288&lon1=-114.83208606646728&lon2=-115.48191020892334?category=&query="
    );
    result = await result.json();
    props.setDatamap(result);
    setData(result);
  }

  return (
    <div>
      <div className="bar">
        <p>
          AMOUNT OF RESULTS: {isActive ? data.length : props.locationmap.length}
        </p>
        <button onClick={() => getAllData()}>
          {isActive ? "only map results" : "all results"}
        </button>
      </div>
      <div className="content">
        {isActive
          ? data.map((item) => (
              <div className="box" key={item.listing_id}>
                <div className="top"></div>
                <div className="center">
                  <p>{item.app}</p>
                  <p>{item.company}</p>
                  <p>{item.state}</p>
                  <p>{item.addr1}</p>
                  <p>{item.phone}</p>
                </div>
                <div className="bottom">
                  <button
                    onClick={() => onButtonClick(item.latitude, item.longitude)}
                  >
                    Locate adress
                  </button>
                </div>
              </div>
            ))
          : props.locationmap.map((item) => (
              <div className="box" key={item.listing_id}>
                <div className="top"></div>
                <div className="center">
                  <p>{item.app}</p>
                  <p>{item.company}</p>
                  <p>{item.state}</p>
                  <p>{item.addr1}</p>
                  <p>{item.phone}</p>
                </div>
                <div className="bottom">
                  <button
                    onClick={() => onButtonClick(item.latitude, item.longitude)}
                  >
                    Locate adress
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Places;
