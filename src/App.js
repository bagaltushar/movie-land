import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?apikey=e411281&";

const App = () => {
  const [movies, setmovies] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title || "spiderman"}`);
    const data = await response.json();

    console.log(data.Search);
    setmovies(data.Search);
  };

  useEffect(() => {
    searchMovie("spiderman");
  }, []);

  return (
    <div className="app">
      <h1>FilmLand</h1>
      <div className="search">
        <input
          placeholder="search your movie"
          value={SearchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(SearchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>no movie found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
