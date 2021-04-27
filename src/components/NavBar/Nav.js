import React from "react"
import { Link } from "react-router-dom"
import {Legend} from '../legend/Legend';
import "bootstrap/dist/css/bootstrap.min.css";
import './nav.css';

export const Nav = (props) => {
  return (
    <nav className="navbar nav-color flex-md-nowrap p-0 shadow">

      <ul className="nav nav-pills nav-fill nb_width">
        <li className="nav-item">
          <Link className="nav-link navbar_link " to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Legend />
        </li>
        <li className="nav-item logOff">
          <Link className="nav-link navbar_link " to="/events">Login</Link>
        </li>
      </ul>
    </nav>
  )
}