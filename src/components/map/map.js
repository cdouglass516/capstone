import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, MapConsumer, Circle, Rectangle, useMapEvents } from "react-leaflet";
import { LatLng, LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';
import histIcon from '../../static/markers/historicalMarker.png';
import paIcon from '../../static/markers/publicArtMarker.png';
import venueIcon from '../../static/markers/venueMarker.png'
import parkIcon from '../../static/markers/parkMarker.png';
import userIcon from '../../static/markers/userMarker.png';
import cw from '../../static/cw_with_bg.png'
import { getNashData } from '../../dataLayer/apiAccess';

export const MapSpace = ({ pubArt, setPubArt, parks, setParks, hist, setHist, venues, setVenues, userAdds, setUserAdds, setIsPreview, setMarkerLatLng, markers, 
                          setMarkerConfirm, setMapObj, histRef,paRef,parkRef, userRef, venueRef}) => {
  const defaultPosition = [36.1614754, -86.7783034]; // Paris position
  
  
  const mapRef = React.createRef();
  // event handlers are here ///////////
  const [position, setPosition] = React.useState(LatLngExpression);
  const [hasClicked, setHasClicked] = React.useState(false);


  /////////////////////

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
  const userICON = L.icon({
    iconUrl: userIcon,
    retinaIcon: userIcon,
    iconSize: 12
  })
  React.useEffect(() => {
    getNashData('pa').then(resp => {
      resp.forEach((item, index) => {
        if (item.civil_war_site === "TRUE") item.civil_war_site = true;
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
    getNashData('user').then(response => {
      response.forEach((item, index) => {
        if (item.longitude === undefined) {
          response.splice(index, 1)
        }
      })
      return response;
    }).then(data => {
      setUserAdds(data);
    })
  }, []);

  React.useEffect(() => {

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: userIcon,
      iconUrl: paIcon
    });
  }, []);


  function AddMarkerToClick() {
    const map = useMapEvents({
      click(e) {
        setMarkerLatLng(e.latlng);
        setMarkerConfirm(true);


      },
    })

    return (
      <>
        {markers.map(marker =>
          <Marker position={marker}>
            <Popup>Marker is at {marker}</Popup>
          </Marker>
        )}
      </>
    )
  }


  return (
    <>
      <div id="pageDiv">
        <div className="map_div">
          <MapContainer id="mapComp" editable={true} center={defaultPosition} zoom={13} zoomControl={false} style={{ height: "90vh", width: "95vw" }} whenCreated={map => setMapObj(map)}>

            <AddMarkerToClick />

            <LayersControl position="topright">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LayersControl.Overlay name="Historical Markers">
                <LayerGroup id='histLayer' ref={histRef}>
                  {hist.map((item, index) => (
                    <Marker position={[item.latitude, item.longitude]} icon={histICON} key={index}>
                      <Popup>
                        <div className="marker_div">
                          {item.marker_name}<br />
                      Year Erected:{item.year_erected}<br />
                          <div className="hist_text">
                            <p>{item.marker_text}</p> <br />
                          </div>
                          {item.location} <br />
                          {item.civil_war_site && <img src={cw}></img>}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Public Art">
                <LayerGroup id='paLayer' ref={paRef}>
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
                <LayerGroup id='parkLayer' ref={parkRef}>
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
                <LayerGroup id='venueLayer' ref={venueRef}>
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
              <LayersControl.Overlay name="User Sourced">
                <LayerGroup id='userLayer' ref={userRef}>
                  {userAdds.map((item, index) => (
                    <Marker position={[item.latitude, item.longitude]} icon={userICON} key={index}>
                      <Popup>
                        {item.name}<br />
                        <b>User Rating</b> {Math.round(item.ratingsTotal / item.nbrReviews)}{String.fromCharCode(9733)}
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>

            </LayersControl>
          </MapContainer>

        </div>
      </div>
    </>
  );
};


