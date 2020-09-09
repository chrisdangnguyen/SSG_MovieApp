import React, { useContext } from "react";
import { UserListContext } from "../../UserListContext";
import noImage from "../../no_image.png";

const ListItem = props => {
  const { listState } = useContext(UserListContext);

  let formattedDate;
  if (props.releaseDate) {
    const date = props.releaseDate.split("-");
    formattedDate = `${date[1]}/${date[2]}/${date[0]}`;
  } else {
    formattedDate = "";
  };

  let movieImage;
  if (props.image) {
    movieImage = `https://image.tmdb.org/t/p/w185_and_h278_multi_faces/${props.image}`;
  } else {
    movieImage = noImage;
  };

  const listIDs = listState.list.map((movie) => movie.id);
  let button;
  if (listIDs.includes(props.id)) {
    button = (
      <button
        className="btn btn-primary btn-lg my-4"
        onClick={() => props.deleteMovie(props.id)}
      >
        Unmark
      </button>
    );
  } else {
    button = (
      <button
        className="btn btn-primary btn-lg my-4"
        onClick={() => props.addMovie(props.id)}
      >
        Mark
      </button>
    );
  };

  return (
    <li className="media my-5">
      <img
        src={movieImage}
        alt="Not Available"
        className="align-self-center mr-3 no-image"
      />
      <div className="media-body">
        <h1 className="mt-0">{props.title}</h1>
        <h5 className="mt-0">Release Date: {formattedDate}</h5>
        <p className="mb-0">{props.overview}</p>
        {button}
      </div>
    </li>
  );
};

export default ListItem;