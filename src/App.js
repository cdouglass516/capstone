import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Nav } from "./components/NavBar/Nav";
import './App.css';
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Preview } from "./components/preview/Preview";
import { Detail } from "./components/detail/Detail";
import { AddMarker } from "./components/marker/AddMarker";
import { MapSpace } from './components/map/map';
import './components/map/map.css';



export const App = () => {
  const defaultPosition = [36.1614754, -86.7783034]; // Paris position
  const [isDetail, setIsDetail] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);
  const [isMarker, setIsMarker] = React.useState(false);
  const [markerConfirm, setMarkerConfirm] = React.useState(false);
  const [pubArt, setPubArt] = React.useState([]);
  const [parks, setParks] = React.useState([]);
  const [hist, setHist] = React.useState([]);
  const [venues, setVenues] = React.useState([]);
  const [detail, setDetail] = React.useState({});
  const [userAdds, setUserAdds] = React.useState([]);
  const [markers, setMarkers] = React.useState([]);
  const [comments, setComments] = React.useState([]); 
  const [markerLatLng, setMarkerLatLng] = React.useState({});
  const [preview, setPreview] = React.useState('');
  const [mapObj, setMapObj] = React.useState(null);
  const [hasHist, setHasHist] = React.useState(false);
  const [hasPa, setHasPa] = React.useState(false);
  const [hasPark, setHasPark] = React.useState(false);
  const [hasUser, setHasUser] = React.useState(false);
  const [hasVenue, setHasVenue] = React.useState(false);
  const [loggedUserId, setLoggedUserId] = React.useState(parseInt(sessionStorage.getItem("exploreNashvegas_user")));
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
    setMarkerConfirm(false);
  }
  const AddMarkerConfirmation = ({ markerLatLng }) => {
    return (
      <div className="marker_div">
        <div>
        <label>Add a new Marker?</label>
        </div>
        <a href="#" className='btn_app btnAffirm' onClick={handleMarkerBtn}>Yes</a>
        <a href='#' className='btn_app btnCancel' onClick={() => setMarkerConfirm(false)}>Cancel</a>
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

  return (<>
    <Route
      render={() => {
        if (sessionStorage.getItem("exploreNashvegas_user")) {
          return (
            <>


              <Preview
                isVisible={isPreview} preview={preview} setIsDetail={setIsDetail} setIsPreview={setIsPreview} hasHist={hasHist} hasPa={hasPa} users={userAdds}
                hasPark={hasPark} hasUser={hasUser} hasVenue={hasVenue} venues={venues} mapObj={mapObj}hist={hist} pubArt={pubArt} parks={parks}
                setHasHist={setHasHist} setHasPa={setHasPa} setHasPark={setHasPark} setHasUser={setHasUser} setHasVenue={setHasVenue}
              />
              <Detail
                isDetail={isDetail} detail={detail} closeDetail={closeDetail} comments={comments} setComments={setComments}/>
              <AddMarker
                isMarker={isMarker} setIsMarker={setIsMarker} marker={detail} setUserAdds={setUserAdds} markerLatLng={markerLatLng}
              />
              <Nav setIsPreview={setIsPreview} setPreview={setPreview} mapObj={mapObj} histRef={histRef} paRef={paRef} parkRef={parkRef} userRef={userRef} venueRef={venueRef} 
              defaultPosition={defaultPosition} hasHist={hasHist} setHasHist={setHasHist} hasPa={hasPa} setHasPa={setHasPa} hasPark={hasPark} setHasPark={setHasPark} 
              hasUser={hasUser} setHasUser={setHasUser} hasVenue={hasVenue} setHasVenue={setHasVenue} />
              {markerConfirm && <AddMarkerConfirmation markerLatLng={markerLatLng} />}

              <MapSpace
                pubArt={pubArt} setPubArt={setPubArt} parks={parks} setParks={setParks} hist={hist} setHist={setHist} comments={comments} setComments={setComments}
                venues={venues} setVenues={setVenues} userAdds={userAdds} setUserAdds={setUserAdds} markers={markers} setIsDetail={setIsDetail} 
                setMarkers={setMarkers} setMarkerConfirm={setMarkerConfirm} setMarkerLatLng={setMarkerLatLng} setIsPreview={setIsPreview} hasUser={hasUser}
                setMapObj={setMapObj} histRef={histRef}paRef={paRef} parkRef={parkRef} userRef={userRef} venueRef={venueRef} setDetail={setDetail}
              />

            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login setLoggedUserId={setLoggedUserId} loggedUserId={loggedUserId}/>
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
  )
}