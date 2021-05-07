import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
import { BsFillXSquareFill } from "react-icons/bs";
import { HistoricalMarker } from "./HistoricalMarker";
import {UserSourced} from './UserSourced';
import {PublicArt} from './PublicArt';
import {Parks} from './Park';
import {Venue} from './Venue'

export const Preview = ({ isVisible, hist, setIsPreview, hasHist, hasPa, hasPark, hasUser, hasVenue, setHasHist, setHasPa, setHasPark, setHasUser, setHasVenue, venues, mapObj, pubArt,parks, users }) => {

  const closePreview = () => {
    setIsPreview(false);
  }

  const returnRandomNumber =(i) =>{
    if(Number.isInteger(i) ){
      return Math.floor(Math.random() * i); 
    }
    return null;
  }
  return (
    <div
      className={`preview__container preview__container--${isVisible && "active"
        }`}
    >

        <div className="emptyDiv"></div>
        <div className="preview__description">
          {hasHist && <HistoricalMarker hist={hist} returnRandomNumber={returnRandomNumber} mapObj={mapObj} setHasPa={setHasPa} setHasPark={setHasPark} setHasUser={setHasUser} setHasVenue={setHasVenue}/>}
          {hasPa && <PublicArt pubArt={pubArt} returnRandomNumber={returnRandomNumber} mapObj={mapObj} setHasHist={setHasHist} setHasPark={setHasPark} setHasUser={setHasUser} setHasVenue={setHasVenue}/>}
          {hasPark && <Parks  parks={parks} returnRandomNumber={returnRandomNumber} mapObj={mapObj} setHasHist={setHasHist} setHasPa={setHasPa} setHasUser={setHasUser} setHasVenue={setHasVenue}/>}
          {hasUser && <UserSourced  users={users} returnRandomNumber={returnRandomNumber} mapObj={mapObj}setHasHist={setHasHist} setHasPa={setHasPa} setHasPark={hasPark} setHasVenue={setHasVenue} />}
          {hasVenue && <Venue venues={venues} mapObj={mapObj}setHasHist={setHasHist} setHasPa={setHasPa} setHasPark={setHasPark} setHasUser={setHasUser}/>}
          
          

        </div>
      <div className="preview__close" onClick={() => closePreview()}>
        <BsFillXSquareFill />
      </div>
    </div>
  )
}