import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
import { BsFillXSquareFill } from "react-icons/bs";
import { HistoricalMarker } from "./HistoricalMarker";
import {UserSourced} from './UserSourced';
import {PublicArt} from './PublicArt';
import {Parks} from './Park';

export const Preview = ({ isVisible, preview, setIsDetail, setIsPreview, hasHist, hasPa, hasPark, hasUser }) => {

  const openDetail = () => {
    setIsPreview(false);
    setIsDetail(true);
  }
  const closePreview = () => {
    setIsPreview(false);
  }
  return (
    <div
      className={`preview__container preview__container--${isVisible && "active"
        }`}
    >


        <div className="preview__description">
          {hasHist && <HistoricalMarker />}
          {hasPa && <PublicArt />}
          {hasPark && <Parks />}
          {hasUser && <UserSourced />}
          
          

        </div>
      <div className="preview__close" onClick={() => closePreview()}>
        <BsFillXSquareFill />
      </div>
    </div>
  )
}