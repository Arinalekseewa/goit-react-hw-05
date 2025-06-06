import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&language=uk-UA`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzc0ZDlhY2NiYzNjNTk5YWJkNGRhODQ3ZDVlZDI1NyIsIm5iZiI6MTc0OTAyOTk5OS4zMzksInN1YiI6IjY4NDAxNDZmZDc2NDA2M2Y1MmFkOGE5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7JCxN7Du0QQFCsUknFB0MAfCRkizbanpuIrLtYpX6Bc',
      },
    })
    .then(res => setMovies(res.data.results))
    .catch(console.error);
  }, [query]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const value = evt.target.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className={styles.page}>
      <h1>🎬 Подорож у світ кіно починається тут</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Що дивимось сьогодні?"
          className={styles['form-input']}
        />
        <button type="submit" className={styles['form-button']}>
          Пошук
        </button>
      </form>

      {movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </main>
  );
}