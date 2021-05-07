import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
export const Venue = ({ venues, mapObj,}) => {
    const handleVenueClick = (lat, lng) => {
        if (mapObj) mapObj.flyTo([lat, lng]);
    }
    return (
        <div>
            <div className="overview">
                <h3>Nashville Venues</h3>
                <p>Nashville has larger venues</p>
            </div>
            <ol>
                {venues.map(venue => {
                    return <li><a href="#" onClick={(event) => handleVenueClick(venue.latitude, venue.longitude)} className="preview_link">{venue.name}</a></li>
                })}
            </ol>
        </div>
    )
}

