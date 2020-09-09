import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import MovieItem from "../List/ListItem";
import { UserListContext } from "../../UserListContext";
import { UserSessionContext } from "../../UserSessionContext";
import axios from "axios";
import { API_KEY, LIST_ID } from "../../key";

const Searches = props => {
  const {listState, setList} = useContext(UserListContext);
  const { sessionState } = useContext(UserSessionContext);

  const addMovie = (id) => {
    const movieToAdd = {
      media_id: id
    };
    
    axios
      .post(
        `https://api.themoviedb.org/3/list/${LIST_ID}/add_item?api_key=${API_KEY}&session_id=${sessionState.session_id}`,
        movieToAdd
      )
      .catch((error) => console.log(error));
      
    props.location.state.movies.forEach((movie) => {
      if (movie.id === id) {
        setList({ list: [...listState.list, movie]});
      };
    });
  };
    
  const deleteMovie = (id) => {
    const movieToDelete = {
      media_id: id,
    };
    
    axios
    .post(
      `https://api.themoviedb.org/3/list/${LIST_ID}/remove_item?api_key=${API_KEY}&session_id=40e88819a9f122fe1d5df959910ba5829a085459`,
      movieToDelete
      )
      .catch(error => console.log(error));
      
      setList({
        list: listState.list.filter((movie) => movie.id !== id)
      });
  };
      
  let messageCount;
  if (!props.location.state) {
    return <h2 className="container">Try your search again</h2>
  } else if (props.location.state.movies.length === 0) {
    messageCount = (
      <div>
        <h2>There are no movies that matched your query.</h2>
        <h3>Total Movies: {props.location.state.total}</h3>
      </div>
    );
  } else {
    messageCount = (
      <h3 className="my-5">Total Movies: {props.location.state.total}</h3>
    );
  };
    
  const searchList = props.location.state.movies;
  const searchItem = searchList.map((movie, idx) => {
    return (
      <MovieItem
        key={idx}
        idx={idx}
        id={movie.id}
        title={movie.title || ""}
        releaseDate={movie.release_date || ""}
        overview={movie.overview || ""}
        image={movie.poster_path || ""}
        deleteMovie={deleteMovie}
        addMovie={addMovie}
      />
    );
  })
    
  return(
    <div className="container">
      {searchItem}
      {messageCount}
    </div>
  );
};

export default withRouter(Searches);
