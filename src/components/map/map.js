import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, useMapEvents } from "react-leaflet";
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
import { GetComments } from '../../dataLayer/appAccesss';

export const MapSpace = ({ pubArt, setPubArt, parks, setParks, hist, setHist, venues, setVenues, userAdds, setUserAdds, setComments, comments, setMarkerLatLng, markers,
  setMarkerConfirm, setMapObj, histRef, paRef, parkRef, userRef, venueRef, setDetail, setIsDetail, hasUser }) => {
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
      const parkArray = data.map((item, index) => {
        let location = JSON.parse(item.mapped_location.human_address);
        item.location = `${location.address}, ${location.city}  ${location.zip}`
        return item;
      })
      setParks(parkArray);
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
  const handleUserClick = (marker) => {
    setDetail({ ...marker.item });
    GetComments(marker.item.id).then(response => {
      setComments(response)
      return response;
    }).then(data => {
      setIsDetail(true);
    })
  }

  function AddMarkerToClick() {

    const map = useMapEvents({
      click(e) {
        setMarkerLatLng(e.latlng);
        if (hasUser) {
          setMarkerConfirm(true);
        }
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
                          <div className="popup_text">
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
                        <div className="marker_div">
                          <strong>{item.title}</strong>
                          <div className="popup_text">
                            <p>by {item.first_name} {item.last_name}</p>
                            <p>{item.type} in medium:{item.medium}</p>
                            <p>location:{item.location}</p>
                          </div>

                        </div>
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
                        <div className="marker_div">
                          <strong>{item.park_name}</strong>
                          <div className="popup_text">
                            <p>{item.notes}</p>
                            <p>location:{item.location}</p>
                            <div className="popupDetail">
                              <label>ADA Accessible: {item.ada_accessible}</label>
                              <label>Restrooms: {item.restrooms_available}</label>
                              <label>Playground: {item.playground}</label>
                              <label>Picnic Shelters: {item.picnic_shelters} - {item.picnic_shelters_quantity} </label>
                              <label>Dog Park: {item.dog_park} </label>
                            </div>
                            <div className="add_details">
                              <label><b>acreage:</b>{item.acres} &nbsp;<b>Baseball Fields:</b>{item.baseball_fields}</label>
                              <label><b>Camping by Permit:</b>{item.camping_available_by_permit} &nbsp;<b>Disc Golf:</b>{item.disc_golf}</label>
                              <label><b>Community Center:</b>{item.community_center} &nbsp;<b>Football Fields:</b>{item.football_multi_purpose_fields}</label>
                              <label><b>Golf Course:</b>{item.golf_course} &nbsp;<b>Hiking Trails:</b>{item.hiking_trails}</label>
                              <label><b>Lake:</b>{item.lake} &nbsp;<b>Boat Launch:</b>{item.boat_launch} &nbsp;<b>Canoe Launch:</b>{item.canoe_launch}</label>
                              <label><b>Bike Trails:</b> {item.mountain_bike_trails} &nbsp;<b>Skate Park</b>{item.skate_park}</label>
                              <label><b>Soccer Fields:</b>{item.soccer_fields} &nbsp;<b>Spray Park:{item.spray_park}</b></label>
                              <label><b>Swimming Pool:</b>{item.swimming_pool} &nbsp;<b>Tennis Courts:{item.tennis_courts}</b></label>
                              <label><b>Volleyball</b>{item.volleyball} &nbsp;<b>Walk/Jog Paths:</b>{item.walk_jog_paths}</label>
                            </div>

                          </div>

                        </div>
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
                        <div className="marker_div">
                          <strong>{item.name}</strong>
                          <div className="popup_text">
                            <p>{item.description}</p>
                            <p>location:{item.location}</p>
                            <a src={item.link} alt={item.name}>{item.name}</a>
                            <img src={item.image} alt={item.name} className="popupImage"></img>
                          </div>
                        </div>
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
                        <div className="marker_div">
                          <strong>{item.name}</strong>
                          <div className="popup_text">
                            <p>{item.description}</p>
                            <p>What:{item.type}</p>
                            <div className="popupDetail">
                              <b>User Rating</b> {Number.parseFloat(item.ratingsTotal / item.nbrReviews).toFixed(1)}{String.fromCharCode(9733)}
                            </div>
                            <a href="#" onClick={() => { handleUserClick({ item }) }} > More Info</a>
                          </div>
                        </div>
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


