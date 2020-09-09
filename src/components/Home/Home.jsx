import React from "react";
import { withRouter } from "react-router-dom";
import List from "../List/List";

const Home = () => {
  return(
    <div className="container">
      <div className="jumbotron my-4 secondary-container">
        <h1 className="home-title">Your Movie List</h1>
      </div>
      <List />
    </div>
  );
};


export default withRouter(Home);