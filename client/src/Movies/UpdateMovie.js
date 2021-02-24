import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const { movieList } = props;
  const [movie, setMovie] = useState(initialMovie);

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        movieList[id] = movie;
        push(`/movies/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={movie.title}
          placeholder="title"
        ></input>
        <input
          type="text"
          name="director"
          onChange={handleChange}
          value={movie.director}
          placeholder="director"
        ></input>
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
          placeholder="metascore"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
