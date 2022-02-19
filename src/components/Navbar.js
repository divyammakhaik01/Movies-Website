import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <div className="container my-4">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h2 style={{ marginRight: "100px" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                Movies
              </Link>
            </h2>
            <h2>
              <Link to="/Favroute" style={{ textDecoration: "none" }}>
                Favourate
              </Link>
            </h2>
          </div>
        </div>
      </>
    );
  }
}
