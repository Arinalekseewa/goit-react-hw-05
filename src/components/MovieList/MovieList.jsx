import { useEffect, useState } from 'react';
import { fetcher } from '../../utils/fetcher';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetcher('/trending/movie/day')
      .then(data => setMovies(data.results))
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </main>
  );
}
