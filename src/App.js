import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { UserListContext } from "./UserListContext";
import { UserSessionContext } from "./UserSessionContext";
import axios from "axios";
import { API_KEY, LIST_ID, ACCESS_TOKEN } from './key';

import "./App.css";
import HomeContainer from "./components/Home/Home";
import SearchContainer from "./components/Search/SearchPage";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const [listState, setList] = useState({ list: [] });
  const [sessionState, setSession] = useState({session_id: null});

  useEffect(() => {
    const session = {
      access_token: ACCESS_TOKEN
    };

    axios
      .post(
      `https://api.themoviedb.org/3/authentication/session/convert/4?api_key=${API_KEY}`,
      session
      )
      .then(res => {
        setSession({ session_id: res.data.session_id });
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/list/${LIST_ID}?api_key=${API_KEY}&language=en-US`
      )
      .then((res) => {
        setList({ list: res.data.items });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <UserSessionContext.Provider value={{ sessionState }}>
          <UserListContext.Provider value={{ listState, setList }}>
            <Route exact path="/search" component={SearchContainer} />
            <Route exact path="/" component={HomeContainer} />
          </UserListContext.Provider>
        </UserSessionContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;
