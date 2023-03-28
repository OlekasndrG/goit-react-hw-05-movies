// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=ba542000abc8f23c21b9168c238e4f34&language=en-US&page=1

import axios from 'axios';
// import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
// import { lazy, Suspense } from 'react';

// const MyComponent = lazy(() => import('path/to/MyComponent'));
// const API_KEY = 'ba542000abc8f23c21b9168c238e4f34';

const MovieReviews = () => {
   const { movieId } = useParams();

   const [movie, setMovie] = useState([]);
   const [isLoading, setIsloading] = useState(false);
   const [error, setError] = useState(null);
   useEffect(() => {
      setIsloading(true);
      const fetchMovie = async () => {
         try {
            // setIsloading(true);
            const res = await axios(
               ` https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ba542000abc8f23c21b9168c238e4f34&language=en-US&page=1`
            );
            setMovie(res.data.results);
            if (!res.data.results.length) {
               return setError('Відсутні відугки');
            }
            // return res.data;
         } catch (error) {
            return setError(error.message);
         }
      };
      fetchMovie().finally(() => setIsloading(false));
   }, [movieId]);

   return (
      <div>
         {error && <p> {error}</p>}
         {isLoading && <Loader />}
         <ul>
            {movie.map(movie => {
               return (
                  <li key={movie.id}>
                     <div>
                        <h3>{movie.author}</h3>
                        <p>{movie.content}</p>
                     </div>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};
export default MovieReviews;
