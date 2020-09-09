import React, { useState, useEffect, useRef} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../key";

const SearchBar = props => {
  const [queryState, setQuery] = useState("");
  const [displayState, setDisplay] = useState(false);
  const [optionsState, setOptions] = useState([]);
  const wrapperRef = useRef(null)

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let movies = [];
    const query = encodeURI(queryState);
    if (queryState) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .then((res) => {
          movies = res.data.results.slice(0, 10)
          setOptions(movies)
        })
        .catch((error) => console.log(error));
    }
  }, [queryState])

  const submitSearch = event => {
    event.preventDefault();

    const query = encodeURI(queryState);
    if (queryState) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .then((res) => {
          props.history.push(
            { pathname: "/search", 
              state: { movies: res.data.results.slice(0, 10), 
              total: res.data.total_results }
            }
          )
        })
        .catch(error => console.log(error))
    };
  };

  const setSearchQuery = (title, id) => {
    setDisplay(false);
    optionsState.forEach(movie => {
      if (movie.id === id) {
        props.history.push({
          pathname: "/search",
          state: { movies: [movie], 
          total: 1
          }
        })
      }
    })
  }

  const changeQuery = (event) => {
    if (displayState === false ) setDisplay(true);
    setQuery(event.target.value)
  }

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false)
    }
  }

  return (
    <div ref={wrapperRef} className="form-container">
      <form
        onSubmit={submitSearch}
        className="form-inline mt-2 mt-md-0"
      >
        <input
          className="form-input mr-sm-2 search-query"
          type="text"
          value={queryState}
          placeholder="Search for movies..."
          onChange={event => changeQuery(event)}
          onClick={() => setDisplay(!displayState)}
        />
        {displayState && (
          <div className="auto-container">
            {optionsState
              .map((movie, idx) => {
                return (
                  <div
                    className="option"
                    key={idx}
                    onClick={() => setSearchQuery(movie.title, movie.id)}
                    tabIndex="0"
                  >
                    <span>{movie.title}</span>
                  </div>
                );
              })}
          </div>
        )}
        <button className="btn btn-outline-primary">Search</button>
      </form>
    </div>
  );
};

export default withRouter(SearchBar);