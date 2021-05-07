import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
export const UserSourced = ({users, mapObj, returnRandomNumber}) => {
    const [rndLink, setRndLink]  = React.useState({title: "", medium: ""});
    const createRandomLink = () =>{
        const index = returnRandomNumber(users.length);
        if(index || index ===0) return users[index];
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
                <h3>User Sourced</h3>
                <p>Markers that are curated by users. To comment or rate a user marker you must be logged in!</p>
                <div><a href="#"  onClick={()=>handleRandomClick()} className="preview_link"> Visit a random place in Davidson county ! {rndLink.name} this is a {rndLink.type} with a rating of {Math.round(rndLink.ratingsTotal/rndLink.nbrReviews,1)}</a></div>
                <h4>Filter User Sourced</h4>

            </div>

        </div>
    )
}