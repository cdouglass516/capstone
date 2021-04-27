import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Nav } from "./components/NavBar/Nav";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

import './App.css';
import {MapSpace} from './components/map/map';



const App = () => (

  <>
    <Route
      render={() => {
        if (true) {
          return (
            <>
              <Nav />
               <MapSpace />
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)
export default App;
