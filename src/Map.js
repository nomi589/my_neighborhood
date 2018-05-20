import React from 'react';

function Map(props) {
  if (props.googleMapsLoaded) {
    return <div id="map" role="application" />;
  } else {
    return (
      <div id="map" role="application">
        <p>
          Loading Google Maps...<br />
          If this takes an inordinate amount of time, please check your network
          connection.
        </p>
      </div>
    );
  }
}

export default Map;
