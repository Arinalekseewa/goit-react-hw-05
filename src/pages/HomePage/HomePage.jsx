import styles from "./HomePage.module.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzc0ZDlhY2NiYzNjNTk5YWJkNGRhODQ3ZDVlZDI1NyIsIm5iZiI6MTc0OTAyOTk5OS4zMzksInN1YiI6IjY4NDAxNDZmZDc2NDA2M2Y1MmFkOGE5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7JCxN7Du0QQFCsUknFB0MAfCRkizbanpuIrLtYpX6Bc'; 
const BASE_URL = 'https://api.themoviedb.org/3';


const fetcher = (endpoint) => axios.get(BASE_URL + endpoint, {
  headers: { Authorization: TOKEN }
}).then(res => res.data);

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
    fetcher('/trending/movie/day')
      .then(data => setMovies(data.results))
      .catch(console.error);
  }, []);

    return (
        <div>
            <p>Trending today</p>
            <ul className={styles['movie-list']}>
                {movies.map(movie => (
                    <li key={movie.id}
                        className={styles['movie-item']}>
                        <Link to={'/movies/:movieId'}>
                            <img
                                src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                  : 'https://via.placeholder.com/500x750?text=No+Image'
                                }
                                alt={movie.title} />
                        </Link>
                     </li>
      ))}
            </ul>
        </div>
    );
}