import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [popularToggle, setPopularToggle] = useState(true);

    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        /* Popular Movies */
        const popularMoviesPage1 = axios.get("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1");
        const popularMoviesPage2 = axios.get("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=2");

        axios.all([popularMoviesPage1, popularMoviesPage2]).then(
            axios.spread((res1, res2) => {
                const arr1 = res1.data.results;
                const arr2 = res2.data.results;
                const popular1and2 = arr1.concat(arr2);
                const filteredMovies = popular1and2.filter((en) => en.original_language === "en");
                console.log(filteredMovies);
                setPopularMovies(filteredMovies);
            })
        );

        /* Popular TV */
        const popularTVPage1 = axios.get(" https://api.themoviedb.org/3/tv/popular?api_key=" + api_key + "&language=en-US&page=1");
        const popularTVPage2 = axios.get(" https://api.themoviedb.org/3/tv/popular?api_key=" + api_key + "&language=en-US&page=2");

        axios.all([popularTVPage1, popularTVPage2]).then(
            axios.spread((res1, res2) => {
                const arr1 = res1.data.results;
                const arr2 = res2.data.results;
                const popular1and2 = arr1.concat(arr2);
                const filteredTV = popular1and2.filter((en) => en.original_language === "en");
                setPopularTV(filteredTV);
            })
        );
    }, []);

    const navigate = useNavigate();
    const info = useCallback((e) => navigate("/movie/" + e.target.id, { replace: true }), [navigate]);

    return (
        <div>
            <h1 className="popularTitle">Popular</h1>
            <div className="toggleContainer">
                <h1 className={popularToggle ? "bold" : null}>Movies</h1>
                <label className="switch">
                    <input type="checkbox" onClick={() => setPopularToggle(!popularToggle)} />
                    <span className="slider round"></span>
                </label>
                <h1 className={popularToggle ? null : "bold"}>TV Shows</h1>
            </div>

            {/* Movies */}
            {popularToggle ? (
                <div className="moviesContainer">
                    {popularMovies.map((movie) => {
                        return (
                            <div className="movieContainer">
                                <img src={"http://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" className="moviePoster" id={movie.id} onClick={info} />
                                <p>{movie.original_title}</p>
                                <p>{movie.vote_average}</p>
                            </div>
                        );
                    })}
                </div>
            ) : null}

            {/* TV */}
            {popularToggle ? null : (
                <div className="moviesContainer">
                    {popularTV.map((TV) => {
                        return (
                            <div className="movieContainer" id={TV.id}>
                                <img src={"http://image.tmdb.org/t/p/w500" + TV.poster_path} alt="" className="moviePoster" />
                                <p>{TV.name}</p>
                                <p>{TV.vote_average}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Home;
