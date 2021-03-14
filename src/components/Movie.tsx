import React, { useState } from "react";
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    release_date: string;
}

const InfoValue = ({ children }: { children: React.ReactChild }) => {
    return <span className="movie-info-value">{children}</span>
}

interface Props {
    data: Movie;
    expand: boolean;
}

const MovieCard = ({ data, expand }: Props) => {
    console.log('data', data);
    const { title, popularity, vote_average, poster_path, release_date } = data;
    const [showDetails, setShowDetails] = useState(expand);
    return (
        <div className="movie-card">
            <div
                className="movie-poster"
                style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${poster_path}")` }}
                onClick={() => {
                    setShowDetails(!showDetails);
                }}>
            </div>
            <div className="movie-details">
                <div className="movie-info">{title}</div>
                <div className="movie-info">
                    Popularity:
                    <InfoValue>{Math.round(popularity)}</InfoValue>
                </div>
                { showDetails ? (
                    <>
                        <div className="movie-info">
                            Vote average:
                            <InfoValue>{vote_average}</InfoValue>
                        </div>
                        <div className="movie-info">
                            Released:
                            <InfoValue>{`${format(parseISO(release_date), 'MMM yyyy')}`}</InfoValue>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default MovieCard;
