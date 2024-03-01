// imports
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import {useContext} from "react";
import {UserContext} from "./userContext";
import Stack from 'react-bootstrap/Stack';

// Navbar
export default function Navbar() {
  const {user} = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  // to hide the navbar when on the public website
  if (location.pathname === "/") {
    return
  }
  else {
    //display the navbar in the admin section
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink onMouseEnter={() => setShowToast(true)} onMouseLeave={() => setShowToast(false)} className="navbar-brand" to="/admin">
            <Stack direction="horizontal">
              <img style={{ width: "10%", marginLeft: "5px" }} src="/rocketLogo.png" alt="logo"></img>
              <p className="ms-auto" style={{ fontSize: '14px' }}>Welcome {user.first_name}</p>
            </Stack>
          </NavLink>
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            bg={"danger"}
            style={{
              position: "center",
              width: "37%"
            }}
          >
            <Toast.Header>
              <strong className="mr-auto" >Rocket Elevators</strong>
            </Toast.Header>
            <Toast.Body style={{color:"white"}}>Click on the navbar to go to the admin homepage!</Toast.Body>
          </Toast>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
    );
  }
}
