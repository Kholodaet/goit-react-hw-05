import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviewsMovies } from '../../services/apiMovies';
import css from './MovieReviews.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getReviewsMovies(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesById();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {movieReviews && movieReviews.length > 0 ? (
        <ul className={css.list}>
          {movieReviews.map(user => (
            <li className={css.item} key={user.id}>
              <p className={css.username}>{user.author_details.username}:</p>
              <p>{user.content}</p>
              <hr className={css.hr} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.notFound}>Sorry, we can not find any reviews.</p>
      )}

      {error && <ErrorMessage />}
    </div>
  );
}
