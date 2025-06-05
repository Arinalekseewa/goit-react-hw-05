import { useEffect, useState, Suspense, lazy } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetcher } from '../../utils/fetcher';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from ?? '/';

  useEffect(() => {
    fetcher(`/movie/${movieId}?language=uk-UA`)
      .then(setMovie)
      .catch(console.error);
  }, [movieId]);

  if (!movie) return <p className={styles.loading}>🍿 Завантаження епічного контенту...</p>;

  const { title, overview, poster_path, vote_average, genres, release_date, tagline } = movie;

  return (
    <main className={styles.container}>
      <Link to={backLink} className={styles.backLink}>
        ⬅️ Назад до реальності
      </Link>

      <div className={styles.detailsWrapper}>
        <img
          className={styles.poster}
          src={poster_path ? `${IMG_BASE}${poster_path}` : 'https://via.placeholder.com/300x450?text=No+Popcorn'}
          alt={title}
        />

        <div className={styles.info}>
          <h1 className={styles.title}>🎬 {title}</h1>
          {tagline && <p className={styles.tagline}>💬 {tagline}</p>}
          <p><strong>⭐ Рейтинг:</strong> {vote_average}</p>
          <p><strong>📅 Дата релізу:</strong> {release_date}</p>
          <p className={styles.genres}>
            <strong>🎭 Жанри:</strong> {genres?.map(g => g.name).join(', ') || 'Без жанру, як піца без сиру'}
          </p>
          <p className={styles.overview}>
            <strong>📖 Сюжет:</strong> {overview || 'Цей фільм настільки загадковий, що навіть ми не в курсі.'}
          </p>
        </div>
      </div>

      <div className={styles['additional-info']}>
  <h2>Додаткова інформація 🍿</h2>
  <ul className={styles['info-links']}>
    <li>
      <Link to={`/movies/${movieId}/cast`} className={styles['info-link']}>
        🎭 Акторський склад
      </Link>
    </li>
    <li>
      <Link to={`/movies/${movieId}/reviews`} className={styles['info-link']}>
        📝 Огляди
      </Link>
    </li>
  </ul>

  <Suspense fallback={<p>Завантажуємо магію кіно...</p>}>
          <Outlet />
        </Suspense>
</div>
    </main>
  );
}
