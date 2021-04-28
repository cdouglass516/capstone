import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, FeatureGroup, Circle, Rectangle } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import histIcon from '../../static/markers/historicalMarker.png';
import paIcon from '../../static/markers/publicArtMarker.png';
import venueIcon from '../../static/markers/venueMarker.png'
import parkIcon from '../../static/markers/parkMarker.png';
import { getNashData } from '../../dataLayer/apiAccess';

export const MapSpace = ({ places }) => {
  const [pubArt, setPubArt] = React.useState([]);
  const [parks, setParks] = React.useState([]);
  const [hist, setHist] = React.useState([]);
  const [venues, setVenues] = React.useState([]);
  const defaultPosition = [36.1614754, -86.7783034]; // Paris position
  const rectangle = [
    [36.1614754, -86.7783034],
    [36.2614754, -88.7783034],
  ]
  const venICON = L.icon({
    iconUrl: venueIcon,
    retinaIcon: venueIcon,
    iconSize: 12
  })
  const histICON = L.icon({
    iconUrl: histIcon,
    retinaIcon: histIcon,
    iconSize: 12
  })
  const paICON = L.icon({
    iconUrl: paIcon,
    retinaIcon: paIcon,
    iconSize: 12
  })
  const parkICON = L.icon({
    iconUrl: parkIcon,
    retinaIcon: parkIcon,
    iconSize: 12
  })
  React.useEffect(() => {
    getNashData('pa').then(resp => {
      resp.forEach((item, index) => {
        if (item.longitude === undefined) {
          resp.splice(index, 1)
        }
      })
      return resp;
    }).then(data => {
      setPubArt(data);
    })
  }, []);
  
  React.useEffect(() => {
    getNashData('venue').then(resp => {
      resp.forEach((item, index) => {
        if (item.longitude === undefined) {
          resp.splice(index, 1)
        }
      })
      return resp;
    }).then(data => {
      setVenues(data);
    })
  }, []);

  React.useEffect(() => {
    getNashData('park').then(response => {
      response.forEach((item, index) => {
        if (item.mapped_location.longitude === undefined) {
          response.splice(index, 1)
        }
      })
      return response;
    }).then(data => {
      setParks(data);
    })
  }, []);
  React.useEffect(() => {
    getNashData('hist').then(response => {
      response.forEach((item, index) => {
        if (item.longitude === undefined) {
          response.splice(index, 1)
        }
      })
      return response;
    }).then(data => {
      setHist(data);
    })
  }, []);

  React.useEffect(() => {

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: paIcon,
      iconUrl: paIcon,
      shadowUrl: paIcon
    });
  }, []);


  return (
    <div className="map_div">
      <MapContainer center={defaultPosition} zoom={13} zoomControl={false} style={{ height: "90vh", width: "95vw" }}>
        <LayersControl position="topright">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl.Overlay name="Historical Markers">
            <LayerGroup>
            {hist.map((item, index) => (
              <Marker position={[item.latitude, item.longitude]} icon={histICON} key={index}>
                <Popup>
                  {item.marker_name}<br />
                  {item.location}
                </Popup>
              </Marker>
            ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Public Art">
            <LayerGroup>
            {pubArt.map((item, index) => (
              <Marker position={[item.latitude, item.longitude]} icon={paICON} key={index}>
                <Popup>
                  {item.title}<br />
                  {item.latitude} and {item.longitude}
                </Popup>
              </Marker>
            ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Parks">
            <LayerGroup>
            {parks.map((item, index) => (
              <Marker position={[item.mapped_location.latitude, item.mapped_location.longitude]} icon={parkICON} key={index}>
                <Popup>
                  {item.park_name}<br />
                </Popup>
              </Marker>
            ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Venues">
            <LayerGroup>
            {venues.map((item, index) => (
              <Marker position={[item.latitude, item.longitude]} icon={venICON} key={index}>
                <Popup>
                  {item.name}<br />
                  {item.description}
                </Popup>
              </Marker>
            ))}
            </LayerGroup>
          </LayersControl.Overlay>

        </LayersControl>
        
      </MapContainer>

    </div>
  );
};

// {coords.map(({ lat, lng }, index) => (
//     <Marker position={[lat, lng]} icon={customMarker} key={index}>
//       <Popup>
//         {index + 1} is for popup with lat: {lat} and lon {lng}
//       </Popup>
//     </Marker>
//   ))}
