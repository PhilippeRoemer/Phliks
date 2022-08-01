import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noPicture from "../images/noPicture.png";

function TV() {
    const [tvTitle, setTvTitle] = useState([]);
    const [tvBackdrop, setTvBackdrop] = useState([]);
    const [tvPoster, setTvPoster] = useState([]);
    const [tvYear, setTvYear] = useState([]);
    const [tvRating, setTvRating] = useState([]);
    const [tvDescription, setTvDescription] = useState([]);
    const [tvCast, setTvCast] = useState([]);

    const { id } = useParams();

    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
            .get("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + api_key + "&language=en-US")
            .then((res) => {
                console.log(res.data);
                const TV = res.data;
                setTvTitle(TV.title);
                setTvBackdrop(TV.backdrop_path);
                setTvPoster(TV.poster_path);
                let releaseDate = new Date(TV.first_air_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
                setTvYear(releaseDate);
                setTvRating(TV.vote_average.toFixed(1));
                setTvDescription(TV.overview);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=" + api_key + "&language=en-US")
            .then((res) => {
                console.log(res.data.cast);
                setTvCast(res.data.cast);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(id);
    return (
        <div>
            <div
                className="infoContainerBackground"
                style={{
                    backgroundImage: `linear-gradient(rgba(187, 187, 187, 0.52), rgb(0, 0, 0)),url(${"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + tvBackdrop})`,
                }}
            >
                <div className="infoContainer">
                    <img className="infoContainerPoster" src={"http://image.tmdb.org/t/p/w500" + tvPoster} alt="" />

                    <div>
                        <h1>{tvTitle}</h1>
                        <br />
                        <p>
                            <b>Description:</b> {tvDescription}
                        </p>
                        <br />
                        <p>
                            <b>Released:</b> {tvYear}
                        </p>
                        <br />
                        <p>
                            <b>Rating:</b> {tvRating}
                        </p>
                        <br />
                    </div>
                </div>
            </div>
            <div className="detailContainer">
                <h1 className="crewTitle">Cast & Crew</h1>
                <div className="crewContainer">
                    {tvCast.slice(0, 8).map((cast) => {
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

export default TV;
