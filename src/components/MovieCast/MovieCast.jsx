import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetcher } from '../../utils/fetcher';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetcher(`/movie/${movieId}/credits?language=en-US`)
      .then(data => setCast(data.cast))
      .catch(console.error);
  }, [movieId]);

  if (cast.length === 0) return <p>No cast information.</p>;

  return (
    <ul>
      {cast.slice(0, 10).map(({ cast_id, name, character, profile_path }) => (
        <li key={cast_id}>
          {profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w185${profile_path}`}
              alt={name}
              width="92"
            />
          )}
          <p><strong>{name}</strong></p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
}
