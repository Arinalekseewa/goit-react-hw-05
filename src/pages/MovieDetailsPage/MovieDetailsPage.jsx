import { useEffect, useState, Suspense, lazy, useRef } from 'react';
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
  const backLinkRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    fetcher(`/movie/${movieId}?language=uk-UA`)
      .then(setMovie)
      .catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Я над цим працюю...</p>;

  const { title, overview, poster_path, vote_average, genres, tagline, release_date } = movie;

  return (
    <main>
      <div className={styles.container}>
        <Link to={backLinkRef.current} className={styles['back-link']}>
          ⬅️ Назад в майбутнє
        </Link>

        <div style={{ display: 'flex', marginTop: '40px' }}>
          <img
            className={styles.poster}
            src={
              poster_path
                ? `${IMG_BASE}${poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Popcorn'
            }
            alt={title}
          />

          <div className={styles.details}>
            <h1 className={styles.title}>{title}</h1>
            {tagline && <p className={styles.tagline}>🎬 {tagline}</p>}
            <p>
              <strong>Рейтинг:</strong> {vote_average} ⭐
            </p>
            <p>
              <strong>Дата релізу:</strong> {release_date}
            </p>
            <p className={styles.genres}>
              <strong>Жанри:</strong>{' '}
              {genres?.map((g) => g.name).join(', ') || 'Без жанру, як чай без цукру'}
            </p>
            <p className={styles.overview}>
              <strong>Сюжет:</strong> {overview || 'Цей фільм настільки загадковий, що навіть ми не знаємо, про що він.'}
            </p>
          </div>
        </div>

        <div className={styles['info-section']}>
          <h2>Додаткова інформація</h2>
          <ul className={styles['info-links']}>
            <li>
              <Link to="cast" className={styles['info-link']}>
                🎭 Акторський склад
              </Link>
            </li>
            <li>
              <Link to="reviews" className={styles['info-link']}>
                📝 Огляди
              </Link>
            </li>
          </ul>
        </div>

        <Suspense fallback={<p>Завантажуємо магію кіно...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
