import React from "react";
import axios from "axios";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const [movieInput, setMovieInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const api_key = process.env.REACT_APP_API_KEY;

    const searchMovie = () => {
        console.log(movieInput);
        axios
            .get("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&query=" + movieInput + "&page=1&include_adult=false")
            .then((res) => {
                console.log(res.data.results);
                setSearchResults(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navigate = useNavigate();
    const info = useCallback((e) => navigate("/movie/" + e.target.id, { replace: true }), [navigate]);

    return (
        <div className="searchContainer">
            {searchResults.length > 0 ? (
                <div className="inputContainerAfter">
                    <input type="text" onChange={(e) => setMovieInput(e.target.value)} />
                    <button onClick={searchMovie}>Search Movie</button>
                </div>
            ) : (
                <div className="inputContainer">
                    <input type="text" onChange={(e) => setMovieInput(e.target.value)} />
                    <button onClick={searchMovie}>Search Movie</button>
                </div>
            )}

            <div className="moviesContainer">
                {searchResults.map((movie) => {
                    return (
                        <div className="movieContainer">
                            <img src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" className="moviePoster" id={movie.id} onClick={info} />
                            <p className="rating">{movie.vote_average.toFixed(1)}</p>
                            <p>{movie.original_title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Search;
