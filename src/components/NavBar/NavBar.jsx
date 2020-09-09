import React from "react";
import { Link, withRouter } from "react-router-dom";
import SearchBar from "../Search/SearchBar";

const NavBar = () => {

  return (
    <nav
      className="navbar navbar-light navbar-bar"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <Link to="/" className="navbar-brand">
        Home
      </Link>
      <SearchBar />
    </nav>
  );
};

export default withRouter(NavBar);
