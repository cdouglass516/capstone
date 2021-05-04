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
              <Nav setIsPreview={setIsPreview} setPreview={setPreview}/>
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
