import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './preview.css';
import { BsFillXSquareFill } from "react-icons/bs";
import { HistoricalMarker } from "./HistoricalMarker";
import {UserSourced} from './UserSourced';
import {PublicArt} from './PublicArt';
import {Parks} from './Park';

export const Preview = ({ isVisible, preview, setIsDetail, setIsPreview }) => {



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
          <HistoricalMarker />
          <UserSourced />
          <PublicArt />
          <Parks />

        </div>
      <div className="preview__close" onClick={() => closePreview()}>
        <BsFillXSquareFill />
      </div>
    </div>
  )
}