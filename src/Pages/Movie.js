import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Movie() {
    const [movieID, setMovieID] = useState([]);
    const [movieTitle, setMovieTitle] = useState([]);
    const [movieBackdrop, setMovieBackdrop] = useState([]);
    const [moviePoster, setMoviePoster] = useState([]);
    const [movieYear, setMovieBYear] = useState([]);
    const [movieRating, setMovieRating] = useState([]);
    const [movieDescription, setMovieDescription] = useState([]);

    const { id } = useParams();

    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        setMovieID(id);
        axios
            .get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + api_key + "&language=en-US")
            .then((res) => {
                console.log(res.data);
                const movie = res.data;
                setMovieTitle(movie.title);
                setMovieBackdrop(movie.backdrop_path);
                setMoviePoster(movie.poster_path);
                setMovieBYear(movie.release_date);
                setMovieRating(movie.vote_average);
                setMovieDescription(movie.overview);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(id);
    return (
        <div
            className="infoContainerBackground"
            style={{
                backgroundImage: `linear-gradient(rgba(187, 187, 187, 0.52), rgb(0, 0, 0)),url(${"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + movieBackdrop})`,
            }}
        >
            <div className="infoContainer">
                <div>
                    <img className="infoContainerPoster" src={"http://image.tmdb.org/t/p/w500" + moviePoster} alt="" />
                </div>
                <div>
                    <h1>{movieTitle}</h1>
                    <p>{movieDescription}</p>
                    <p>Released: {movieYear}</p>
                    <p>Rating: {movieRating}</p>
                </div>
            </div>
        </div>
    );
}

export default Movie;
