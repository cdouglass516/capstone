import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
export const PublicArt = ({mapObj,pubArt,returnRandomNumber}) => {
    const [rndLink, setRndLink]  = React.useState({title: "", medium: ""});
    const createRandomLink = () =>{
        const index = returnRandomNumber(pubArt.length);
        if(index) return pubArt[index];
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
                <h3>Public Art</h3>
                <p>There are over 162 pieces of public art in Nashville</p>

                <div><a href="#"  onClick={()=>handleRandomClick()} className="preview_link"> Go to random art work in Davidson county ! {rndLink.title} in {rndLink.medium}!</a></div>

            </div>

        </div>
    )
}