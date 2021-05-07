import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
export const HistoricalMarker = ({hist, returnRandomNumber, mapObj}) => {
    const [rndLink, setRndLink]  = React.useState({marker_namne: ""});
    const createRandomLink = () =>{
        const index = returnRandomNumber(hist.length);
        if(index) return hist[index];
        return null;
    }
    const handleRandomClick = () =>{
        if (mapObj) {
            mapObj.fitBounds([
                [rndLink.latitude, rndLink.longitude]
              ]);
        }
    }
    React.useEffect(() => {
        
            setRndLink({...createRandomLink()});
}, []);
    return(
        <div>
            <div className="overview">
                <h3>Historical Markers</h3>
                <p>There are 216 historical markers in Davidson county. They have been errected from 1900 to 2021 </p>
                <div><a href="#"  onClick={()=>handleRandomClick()} className="preview_link"> Go to random marker {rndLink.marker_name}!</a></div>

            </div>

        </div>
    )
}