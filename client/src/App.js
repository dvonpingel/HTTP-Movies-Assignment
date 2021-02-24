import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Link to="/add-movie">Add Movie</Link>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route
        path="/movies/:id"
        render={(props) => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              movieList={movieList}
              setMovieList={setMovieList}
            />
          );
        }}
      />

      <Route
        path="/update-movie/:id"
        render={(props) => {
          return <UpdateMovie {...props} movieList={movieList} />;
        }}
      />

      <Route
        path="/add-movie"
        render={(props) => {
          return (
            <AddMovie
              {...props}
              setMovieList={setMovieList}
              movieList={movieList}
            />
          );
        }}
      />
    </>
  );
};

export default App;
