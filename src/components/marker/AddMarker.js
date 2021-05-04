import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import './addMarker.css'

export const AddMarker = ({isMarker, marker,closeMarker,setMarkerConfirm}) =>{
    return(
        <div
        className={`marker__container marker__container--${
            isMarker && marker && "active"
        }`}
      >
        <div className="marker__close" onClick={() => closeMarker()}>
          close
        </div>
        <div
          className="marker__picture"
        ></div>
        <div className="marker__description__container">
          <div className="marker__title">{marker?.id}</div>
          <div className="marker__description">{marker?.description}<h1>ADD MARKER PAGE</h1></div>
          
          <div style={{display: 'flex'}}>
            <a className="marker__button" href={marker?.seeMoreLink} target="_blank" rel="noreferrer">See more</a>
          </div>
        </div>
      </div>
    );

}