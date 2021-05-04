import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './detail.css';
import { BsFillXSquareFill } from "react-icons/bs";
export const Detail = ({isDetail, detail,closeDetail}) =>{
return(
        <div
        className={`detail__container detail__container--${
            isDetail && detail && "active"
        }`}
      >
        <div className="detail__close" onClick={() => closeDetail()}>
        <BsFillXSquareFill />
        </div>
        <div
          className="detail__picture"
        ></div>
        <div className="detail__description__container">
          <div className="detail__title">{detail?.id}</div>
          
          <div className="detail__description"><h1>This is where the detail will go</h1>{detail?.description}</div>
          <div style={{display: 'flex'}}>
            <a className="detail__button" href={detail?.seeMoreLink} target="_blank" rel="noreferrer">See more</a>
          </div>
        </div>
      </div>
    );

}