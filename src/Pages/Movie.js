import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noPicture from "../images/noPicture.png";

function Movie() {
    const [movieID, setMovieID] = useState([]);
    const [movieTitle, setMovieTitle] = useState([]);
    const [movieBackdrop, setMovieBackdrop] = useState([]);
    const [moviePoster, setMoviePoster] = useState([]);
    const [movieYear, setMovieBYear] = useState([]);
    const [movieRating, setMovieRating] = useState([]);
    const [movieDescription, setMovieDescription] = useState([]);
    const [movieCast, setMovieCast] = useState([]);

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
                let releaseDate = new Date(movie.release_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
                setMovieBYear(releaseDate);
                setMovieRating(movie.vote_average.toFixed(1));
                setMovieDescription(movie.overview);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + api_key + "&language=en-US")
            .then((res) => {
                console.log(res.data.cast);
                setMovieCast(res.data.cast);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const showTrailer = () => {};

    console.log(id);
    return (
        <div>
            <div
                className="infoContainerBackground"
                style={{
                    backgroundImage: `linear-gradient(rgba(187, 187, 187, 0.52), rgb(0, 0, 0)),url(${"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + movieBackdrop})`,
                }}
            >
                <div className="infoContainer">
                    <img className="infoContainerPoster" src={"http://image.tmdb.org/t/p/w500" + moviePoster} alt="" />

                    <div>
                        <h1>{movieTitle}</h1>
                        <br />
                        <p>
                            <b>Description:</b> {movieDescription}
                        </p>
                        <br />
                        <p>
                            <b>Released:</b> {movieYear}
                        </p>
                        <br />
                        <p>
                            <b>Rating:</b> {movieRating}
                        </p>
                        <br />

                        <button className="button" onClick={showTrailer}>
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
            <div className="detailContainer">
                <h1 className="crewTitle">Cast & Crew</h1>
                <div className="crewContainer">
                    {movieCast.slice(0, 8).map((cast) => {
                        return (
                            <div className="crew">
                                <img src={cast.profile_path !== null ? "https://www.themoviedb.org/t/p/w138_and_h175_face/" + cast.profile_path : noPicture} alt="" className="crewImage" />
                                <p className="castName">{cast.name}</p>
                                <p className="castCharacter">{cast.character}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Movie;
