import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieList({ movies }) {
  const location = useLocation();
  
  return (
    <ul className={styles['movie-list']}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles['movie-item']}>
          <Link to={`/movies/${id}`} state={{ from: location }} className={styles['link']}>
            <img
              src={
                poster_path
                  ? `${IMG_BASE}${poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={title}
              className={styles['poster']}
            />
            <p className={styles['title']}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
