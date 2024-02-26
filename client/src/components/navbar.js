import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink and useLocation to utilize the react router.
import { NavLink, useLocation } from "react-router-dom";
// Here, we display our Navbar
export default function Navbar() {
  const location = useLocation();
  if (location.pathname === "/") {
    return
  }
  else {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/admin">
            <img style={{ width: "10%", marginLeft: "5px" }} src="/rocketLogo.png" alt="logo"></img>
          </NavLink>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {location.pathname !== "/authenticate" && location.pathname !== "/unauthorized" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/create">
                    Create Agent
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
