import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
export const Parks = ({parks, mapObj, returnRandomNumber}) => {
    const [rndLink, setRndLink]  = React.useState({title: "", medium: ""});
    const createRandomLink = () =>{
        const index = returnRandomNumber(parks.length);
        if(index) return parks[index];
        return null;
    }
    const handleRandomClick = () =>{
        if (mapObj) {
            mapObj.fitBounds([
                [rndLink.mapped_location.latitude, rndLink.mapped_location.longitude]
              ]);
        }
    }
    React.useEffect(() => {
        
            setRndLink({...createRandomLink()});
}, []);
    return(
        <div>
            <div className="overview">
                <h3>Parks</h3>
                <p>There are 123 parks in Davidson county offering various amenities. </p>
                <div><a href="#"  onClick={()=>handleRandomClick()} className="preview_link"> Visit a random park in Davidson county ! {rndLink.park_name} @ {rndLink.acres} acres!</a></div>
                <h4>Filter Parks by feature</h4>


            </div>

        </div>
    )
}