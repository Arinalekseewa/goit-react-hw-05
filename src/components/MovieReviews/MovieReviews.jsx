import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetcher } from '../../utils/fetcher';
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const truncate = (text, limit) =>
    text.length > limit ? text.slice(0, limit) + '...' : text;

  useEffect(() => {
    fetcher(`/movie/${movieId}/reviews?language=en-US&page=1`)
      .then(data => setReviews(data.results))
      .catch(console.error);
  }, [movieId]);

  if (reviews.length === 0) return <p>Агов, перший комент твій?</p>;

  return (
        <section className={styles.reviews}>
      {reviews.length === 0 && <p>Агов, перший комент твій?</p>}
      <ul className={styles.reviewList}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={styles.reviewItem}>
            <p><strong>Автор:</strong> {author}</p>
            <p className={styles.reviewContent}>
              {expanded[id] ? content : truncate(content, 300)}
              {content.length > 300 && (
                <button onClick={() => toggleExpand(id)} className={styles.toggleButton}>
                  {expanded[id] ? 'Сховати' : 'Читати далі'}
                </button>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
