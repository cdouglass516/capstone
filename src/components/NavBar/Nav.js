import React from "react"
import { Link } from "react-router-dom"
import { Legend } from '../legend/Legend';
import "bootstrap/dist/css/bootstrap.min.css";
import { CgPlayListSearch } from "react-icons/cg";
import hist from './hist.png';
import './nav.css';
import { MapConsumer } from "react-leaflet";

export const Nav = (props) => {
  const handleMarkerLink = (link) => {
    props.setIsPreview(true);
    switch (link) {
      case 'hist':
        props.setPreview("hist");
        break;
      case 'art':
        props.setPreview("art");
        break;
      case 'park':
        props.setPreview("park");
        break;
      case 'user':
        props.setPreview("user");
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
          <img className="nav-img" src={hist} alt="Historical Markers" onClick={() => handleMarkerLink('hist')}></img>
        </li>
        <li className="nav-item ">
          <img className="nav-img" src={hist} alt="Public Art" onClick={() => handleMarkerLink('art')}></img>
        </li>
        <li className="nav-item ">
          <img className="nav-img" src={hist} alt="Parks" onClick={() => handleMarkerLink('park')}></img>
        </li>
        <li className="nav-item ">
          <img className="nav-img" src={hist} alt="User Sourced" onClick={() => handleMarkerLink('user')}></img>
        </li>
        <li className="nav-item logOff">
          <Link className="nav-link navbar_link " to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}