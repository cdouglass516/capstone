import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Nav } from "./components/NavBar/Nav";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Preview } from "./components/preview/Preview";
import { Detail } from "./components/detail/Detail";
import { AddMarker } from "./components/marker/AddMarker";
import './App.css';
import { MapSpace } from './components/map/map';



export const App = () => {
  const [isDetail, setIsDetail] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);
  const [isMarker, setIsMarker] = React.useState(false);
  const [markerConfirm, setMarkerConfirm] = React.useState(false);
  const [pubArt, setPubArt] = React.useState([]);
  const [parks, setParks] = React.useState([]);
  const [hist, setHist] = React.useState([]);
  const [venues, setVenues] = React.useState([]);
  const [userAdds, setUserAdds] = React.useState([]);
  const [markers, setMarkers] = React.useState([]);
  const [markerLatLng, setMarkerLatLng] = React.useState(null);
  const [preview, setPreview] = React.useState('');
  const [mapObj, setMapObj] = React.useState(null);
  const [hasHist, setHasHist] = React.useState(false);
  const [hasPa, setHasPa] = React.useState(false);
  const [hasPark, setHasPark] = React.useState(false);
  const [hasUser, setHasUser] = React.useState(false);
  const [hasVenue, setHasVenue] = React.useState(false);
  const venueRef = React.useRef(null);
  const histRef = React.useRef(null);
  const paRef = React.useRef(null);
  const parkRef = React.useRef(null);
  const userRef = React.useRef(null);
  const closeMarker = () => {
    setIsMarker(false);
  }
  const handleMarkerBtn = () => {
    setIsMarker(true);
  }
  const AddMarkerConfirmation = ({ markerLatLng }) => {
    return (
      <div>
        <label>Add a new Marker? at lat:{Math.round(markerLatLng.lat, 4)} &&  lng:{Math.round(markerLatLng.lng, 4)}</label>
        <button onClick={handleMarkerBtn}>Yes</button>
        <button onClick={() => setMarkerConfirm(false)}>Cancel</button>
      </div>
    )
  }

  const closeDetail = () => {
    setIsDetail(false);
  }
  const place = () => {
    return {
      id: 0,
      name: 'test'
    }
  }
  const detail = () => {
    return {
      id: 0,
      data: {}
    }
  }

  return (<>
    <Route
      render={() => {
        if (sessionStorage.getItem("exploreNashvegas_user")) {
          return (
            <>


              <Preview
                isVisible={isPreview}
                preview={preview}
                setIsDetail={setIsDetail}
                setIsPreview={setIsPreview}
                hasHist={hasHist}
                hasPa={hasPa}
                hasPark={hasPark}
                hasUser={hasUser}
                hasVenue={hasVenue}

              />
              <Detail
                isDetail={isDetail}
                detail={detail}
                closeDetail={closeDetail} />
              <AddMarker
                isMarker={isMarker}
                marker={detail}
                closeMarker={closeMarker}
                setMarkerConfirm={setMarkerConfirm}
              />
              <Nav setIsPreview={setIsPreview} setPreview={setPreview} mapObj={mapObj} histRef={histRef} paRef={paRef} parkRef={parkRef} userRef={userRef} venueRef={venueRef}
                hasHist={hasHist} setHasHist={setHasHist} hasPa={hasPa} setHasPa={setHasPa} hasPark={hasPark} setHasPark={setHasPark} hasUser={hasUser} setHasUser={setHasUser} hasVenue={hasVenue} setHasVenue={setHasVenue} />
              {markerConfirm && <AddMarkerConfirmation markerLatLng={markerLatLng} />}

              <MapSpace
                pubArt={pubArt}
                setPubArt={setPubArt}
                parks={parks}
                setParks={setParks}
                hist={hist}
                setHist={setHist}
                venues={venues}
                setVenues={setVenues}
                userAdds={userAdds}
                setUserAdds={setUserAdds}
                markers={markers}
                setMarkers={setMarkers}
                setMarkerConfirm={setMarkerConfirm}
                setMarkerLatLng={setMarkerLatLng}
                setIsPreview={setIsPreview}
                setMapObj={setMapObj}
                histRef={histRef}
                paRef={paRef}
                parkRef={parkRef}
                userRef={userRef}
                venueRef={venueRef}
              />

            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
  )
}

// export default App;
