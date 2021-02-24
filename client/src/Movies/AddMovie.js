import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};
const initialActors = {
  actor: "",
  actor2: "",
  actor3: "",
};

const AddMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const [actors, setActors] = useState(initialActors);

  const { push } = useHistory();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleActorChange = (e) => {
    setActors({
      ...actors,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      id: props.movieList.length,
      title: movie.title.trim(),
      director: movie.director.trim(),
      metascore: movie.metascore.trim(),
      stars: [actors.actor, actors.actor2, actors.actor3],
    };
    console.log("NEW MOVIE:", newMovie);
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => {
        console.log(res);
        props.setMovieList([...props.movieList, newMovie]);
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={movie.title}
        ></input>
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        ></input>
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        ></input>
        <h3>Enter 1 Actor per line!</h3>
        <input
          type="text"
          name="actor"
          onChange={handleActorChange}
          placeholder="Actor 1"
          value={actors.actor}
        ></input>
        <input
          type="text"
          name="actor2"
          onChange={handleActorChange}
          placeholder="Actor 2"
          value={actors.actor2}
        ></input>
        <input
          type="text"
          name="actor3"
          onChange={handleActorChange}
          placeholder="Actor 3"
          value={actors.actor3}
        ></input>
        <button>Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
