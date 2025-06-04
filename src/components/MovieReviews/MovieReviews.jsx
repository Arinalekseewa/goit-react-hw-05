import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetcher } from '../../utils/fetcher';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetcher(`/movie/${movieId}/reviews?language=en-US&page=1`)
      .then(data => setReviews(data.results))
      .catch(console.error);
  }, [movieId]);

  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <h4>Author: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}
