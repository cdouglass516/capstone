import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import greenIcon from '../../static/markers/historicalMarker.png';
import shadowIcon from './shadowIcon.png';
import retinaIcon from './retinaIcon.png';

export const MapSpace = ({ places }) => {
  const defaultPosition = [36.1614754, -86.7783034]; // Paris position
    const myICON = L.icon({
      iconUrl: greenIcon,
      shadowUrl: shadowIcon,
      retinaIcon: greenIcon,
      iconSize: 14.56
    })
  React.useEffect(() => {

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: greenIcon,
        iconUrl: greenIcon,
        shadowUrl: greenIcon
    });
}, []);
  

return (
    <div className="map_div">
        <MapContainer center={defaultPosition} zoom={13}  zoomControl={false } style={{ height: "90vh", width: "95vw" }}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={defaultPosition} icon={myICON}>
                <Popup>
                    A pretty CSS3 popup. <br /> 
                    <a href="https://www.w3schools.com"> A link goes here</a>
                </Popup>
            </Marker>
        </MapContainer>
    </div>
);
};
