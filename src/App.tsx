import React, { useEffect, useRef, useState } from 'react';
import MovieCard, { Movie as MovieType} from './components/Movie';
import RateFielter from './components/RateFilter';
import './App.css';

// TODO: comments with 💡 icon show improvements that can be made

const SERVER_URL = 'https://api.themoviedb.org/3';
const API_KEY = '6a72b9a6bed91517034495a57a608ed4';

const discoverUrl = `${SERVER_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const searchUrl = `${SERVER_URL}/search/movie?api_key=${API_KEY}&query=`;

const fetchData = async (url: string) => {
    // 💡 cache requests ( React Query )
    const res = await fetch(url);
    const data = await res.json();
    return data
}

const MovieList = ({ loading, expandCards, list }: {
    loading: boolean,
    expandCards: boolean,
    list: MovieType[]
}) => {
    return (
        <div className="movie-list">
            { loading ? 'Loading...' : null}
            {list.map((movie) =>
                <MovieCard key={movie.id} data={movie} expand={expandCards}/>
            )}
        </div>
    )
}

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const searchInput = useRef<HTMLInputElement | null>(null);
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<MovieType[]>([]);
    const [searchQry, setSearchQry] = useState<string>('');
    const [ratingFilter, setRatingFilter] = useState<number>(0);

    useEffect(() => {
        if(ratingFilter) {
            const filteredData = movies.filter(({ vote_average }) => {
                return vote_average <= ratingFilter && vote_average > (ratingFilter - 2);
            })
            setFilteredMovies(filteredData)
        }
    }, [ratingFilter])

    // 💡 memoize callbacks ( useCallback )
    const discoverMovies = async () => {
        const data = await fetchData(discoverUrl);
        setLoading(false);
        setMovies(data.results);
    }

    const searchData = async (query: string) => {
        const data = await fetchData(`${searchUrl}${query}`);
        setMovies(data.results);
    }

    useEffect(() => {
        discoverMovies();
    }, [])

    useEffect(() => {
        if (searchQry) {
            if(ratingFilter) setRatingFilter(0)
            // 💡 debounce/throttle ( lodash )
            searchData(searchQry);
        } else {
            discoverMovies();
        }
    }, [searchQry])

    const list = ratingFilter ? filteredMovies : movies;

    return (
        // 💡 style inside JS ( styled-components ) + CSS variables
        <div className="App">
            <div className="controls">
                {/* 💡 extract to a <Search/> componeny */}
                <div>
                    <input
                        className="input-search"
                        ref={searchInput}
                        type='text'
                        placeholder="Search"
                        onChange={() => {
                        setSearchQry(searchInput?.current?.value || '')
                    }}/>
                </div>
                 <RateFielter
                     current={ratingFilter}
                     onClick={setRatingFilter}
                />
            </div>
            <MovieList
                loading={loading}
                expandCards={!!ratingFilter}
                list={list}
            />
        </div>
    );
}

export default App;
