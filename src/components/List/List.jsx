import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { UserListContext } from "../../UserListContext";
import { UserSessionContext } from "../../UserSessionContext";
import ListItem from "./ListItem";
import { API_KEY, LIST_ID } from "../../key";

const List = () => {
  const {listState, setList} = useContext(UserListContext);
  const { sessionState } = useContext(UserSessionContext);
  console.log(sessionState)

  const deleteMovie = (id) => {
    const movieToDelete = {
      media_id: id,
    };

    axios
      .post(
        `https://api.themoviedb.org/3/list/${LIST_ID}/remove_item?api_key=${API_KEY}&session_id=${sessionState.session_id}`,
        movieToDelete
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));

    setList({
      list: listState.list.filter((movie) => movie.id !== id)
    });
  };

  const movieItem = listState.list.map((movie, idx) => {
    return( 
      <ListItem 
        key={idx} 
        idx={idx}
        id={movie.id}
        title={movie.title || ""} 
        releaseDate={movie.release_date || ""} 
        overview={movie.overview || ""}
        image={movie.poster_path}
        deleteMovie={deleteMovie}
      />
    );
  });

  return (
    <div>
      <ul className="list-unstyled">
        {movieItem}
      </ul>
      <h3 className="my-5">Total Movies In Your List: {listState.list.length}</h3>
    </div>
  );
};


export default withRouter(List);