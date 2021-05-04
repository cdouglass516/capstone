import React, { useState } from "react";
import { LatLng, LatLngExpression } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";

const MapControl = ({ formIsOpen}) => {
  const [position, setPosition] = useState(LatLngExpression
  );

  useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
    },
  });

  return !formIsOpen || position === null ? null : (
    <Marker position={position}></Marker>
  );
};

export default MapControl;
