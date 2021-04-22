import React from "react"
import { Link } from "react-router-dom"
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
          <Link className="nav-link navbar_link" to="/friends">Venues</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link navbar_link" to="/messages">Historical</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link navbar_link" to="/tasks">Parks</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link navbar_link" to="/events">Public Art</Link>
        </li>
        <li className="nav-item logOff">
          <Link className="nav-link navbar_link " to="/events">Login</Link>
        </li>
      </ul>
    </nav>
  )
}