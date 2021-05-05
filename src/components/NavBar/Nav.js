import React from "react"
import { Link } from "react-router-dom"
import { Legend } from '../legend/Legend';
import "bootstrap/dist/css/bootstrap.min.css";
import { CgPlayListSearch } from "react-icons/cg";
import hist from './hist.png';
import user from './user.png';
import pa from './pa.png';
import park from './park.png';
import venue from './venue.png';
import './nav.css';
import { MapConsumer } from "react-leaflet";

export const Nav = (props) => {

  const handleMarkerLink = (link) => {
    
    switch (link) {
      case 'hist':
        props.setPreview("hist");
        if(props.mapObj){
          if(!props.hasHist){
            props.histRef.current.eachLayer(layer=>{
	          props.mapObj.addLayer(layer)})
            props.setHasHist(!props.hasHist);
            props.setIsPreview(true);
          }else{
            props.histRef.current.eachLayer(layer=>{
              props.mapObj.removeLayer(layer)})
              props.setHasHist(!props.hasHist);
              props.setIsPreview(false);
          }
          
	    }
        break;
      case 'art':
        props.setPreview("art");
        if(props.mapObj){
          if(!props.hasPa){
            props.paRef.current.eachLayer(layer=>{
	          props.mapObj.addLayer(layer)})
            props.setHasPa(!props.hasPa);
            props.setIsPreview(true);
          }else{
            props.paRef.current.eachLayer(layer=>{
              props.mapObj.removeLayer(layer)})
              props.setHasPa(!props.hasPa);
              props.setIsPreview(false);
          }
	    }
        break;
      case 'park':
        props.setPreview("park");
        if(props.mapObj){
          if(!props.hasPark){
            props.parkRef.current.eachLayer(layer=>{
	          props.mapObj.addLayer(layer)})
            props.setHasPark(!props.hasPark);
            props.setIsPreview(true);
          }else{
            props.parkRef.current.eachLayer(layer=>{
              props.mapObj.removeLayer(layer)})
              props.setHasPark(!props.hasPark);
              props.setIsPreview(false);
          }
	    }
        break;
      case 'user':
        props.setPreview("user");
        if(props.mapObj){
          if(!props.hasUser){
            props.userRef.current.eachLayer(layer=>{
	          props.mapObj.addLayer(layer)})
            props.setHasUser(!props.hasUser);
            props.setIsPreview(true);
          }else{
            props.userRef.current.eachLayer(layer=>{
              props.mapObj.removeLayer(layer)})
              props.setHasUser(!props.hasUser);
              props.setIsPreview(false);
          }
	    }
        break;
        case 'venue':
          props.setPreview("venue");
          if(props.mapObj){
            if(!props.hasVenue){
              props.venueRef.current.eachLayer(layer=>{
              props.mapObj.addLayer(layer)})
              props.setHasVenue(!props.hasVenue);
              props.setIsPreview(true);
            }else{
              props.venueRef.current.eachLayer(layer=>{
                props.mapObj.removeLayer(layer)})
                props.setHasVenue(!props.hasVenue);
                props.setIsPreview(false);
            }
        }
          break;
      default:
        break;
    }


  }
  return (
    <nav className="navbar nav-color flex-md-nowrap p-0 shadow">

      <ul className="nav nav-pills nav-fill nb_width">
        <li className="nav-item">
          <strong>Explore Nasville</strong>
          {/* <CgPlayListSearch
            style={{
              fontSize: "3rem",
              verticalAlign: "middle",
              position: "absolute",
              left: "1rem",
              top: ".2rem",
            }}
            onClick={() => props.setIsPreview(true)}
          ></CgPlayListSearch> */}
        </li>
        <li className="nav-item ">
          <a className="nav-link navbar_link "  href="#" alt="Nashville Venues" onClick={() => handleMarkerLink('venue')}><img className="nav-img" src={venue} alt="Historical Markers"/>Nashville Venues</a>
        </li>
        <li className="nav-item ">
          <img className="nav-img" src={hist} alt="Historical Markers" onClick={() => handleMarkerLink('hist')}></img>
        </li>
        <li className="nav-item ">
          <img className="nav-img" src={pa} alt="Public Art" onClick={() => handleMarkerLink('art')}></img>
        </li>
        <li className="nav-item ">
          <img className="nav-img" src={park} alt="Parks" onClick={() => handleMarkerLink('park')}></img>
        </li>
        <li className="nav-item ">
          <img className="nav-img" src={user} alt="User Sourced" onClick={() => handleMarkerLink('user')}></img>
        </li>
        <li className="nav-item logOff">
          <Link className="nav-link navbar_link " to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}