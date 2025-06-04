import { useState } from 'react';
import { fetcher } from '../../utils/fetcher';
import styles from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';

const BASE_URL = 'https://api.themoviedb.org/3';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) return;

    fetcher(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`)
      .then(data => setMovies(data.results))
      .catch(console.error);
  };

  return (
    <main>
      <h1>🧭 Подорож у світ кіно починається тут</h1>

      <form onSubmit={handleSubmit} className={styles['search-form']}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Що дивимось сьогодні?"
          className={styles['form-input']}
        />
        <button type="submit" className={styles['form-button']}>
          Пошук
        </button>
      </form>

      <MovieList movies={movies} />
    </main>
  );
}
