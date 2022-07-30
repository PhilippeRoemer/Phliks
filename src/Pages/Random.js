import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import noPicture from "../images/noPicture.png";

function Random() {
    const api_key = process.env.REACT_APP_API_KEY;

    const [movieTitle, setMovieTitle] = useState([]);
    const [movieBackdrop, setMovieBackdrop] = useState([]);
    const [moviePoster, setMoviePoster] = useState([]);
    const [movieYear, setMovieBYear] = useState([]);
    const [movieRating, setMovieRating] = useState([]);
    const [movieDescription, setMovieDescription] = useState([]);
    const [movieCast, setMovieCast] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState(null);
    const [movieID, setMovieID] = useState([]);

    const randomMovie = () => {
        const randomPage = Math.floor(Math.random() * 5) + 1;
        console.log(randomPage);
        axios
            .get("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=" + randomPage)
            .then((res) => {
                const randomMovie = Math.floor(Math.random() * 20) + 1;
                const movie = res.data.results[randomMovie];

                setMovieTitle(movie.title);
                setMovieBackdrop(movie.backdrop_path);
                setMoviePoster(movie.poster_path);
                let releaseDate = new Date(movie.release_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
                setMovieBYear(releaseDate);
                /* setMovieBYear(movie.release_date); */
                setMovieRating(movie.vote_average.toFixed(1));
                setMovieDescription(movie.overview);
                setMovieID(movie.id);
                setMovieTrailer(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (movieID !== null) {
            console.log(movieID);

            axios
                .get("https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + api_key + "&language=en-US")
                .then((res) => {
                    console.log(res.data.results);
                    const test = res.data.results.filter((trailer) => trailer.type === "Trailer" || trailer.name === "Official Trailer" || trailer.name === "Trailer");
                    console.log(test);
                    console.log(test[0].key);
                    setMovieTrailer(test[0].key);
                })
                .catch((error) => {
                    console.log(error);
                });

            axios
                .get("https://api.themoviedb.org/3/movie/" + movieID + "/credits?api_key=" + api_key + "&language=en-US")
                .then((res) => {
                    console.log(res.data.cast);
                    setMovieCast(res.data.cast);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [movieID]);

    return (
        <div>
            <div
                className="infoContainerBackground"
                style={{
                    backgroundImage: `linear-gradient(rgba(187, 187, 187, 0.52), rgb(0, 0, 0)),url(${"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + movieBackdrop})`,
                }}
            >
                {" "}
                <h1>TESTING</h1>
                <div onClick={randomMovie}>Click here!</div>
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
                        {movieTrailer === null ? null : (
                            <button className="button">
                                <a href={"https://www.youtube.com/watch?v=" + movieTrailer} target="_blank">
                                    Watch Trailer
                                </a>
                            </button>
                        )}
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

export default Random;
