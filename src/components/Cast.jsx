// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

import axios from 'axios';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// const API_KEY = 'ba542000abc8f23c21b9168c238e4f34';

const MovieCast = () => {
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
               `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ba542000abc8f23c21b9168c238e4f34&language=en-US`
            );
            setMovie(res.data.cast);
            if (!res.data.cast.length) {
               setError('Відсутній акторський склад');
            }
            return res.data;
         } catch (error) {
            return setError(error.message);
         }
      };
      fetchMovie().finally(() => setIsloading(false));
   }, [movieId]);

   return (
      <div>
         {isLoading && <p>Loading</p>}
         {error && <p> {error}</p>}
         <ul>
            {movie.map(movie => {
               return (
                  <li key={nanoid()}>
                     <div>{movie.name}</div>
                     <img
                        src={
                           movie.profile_path
                              ? `https://www.themoviedb.org/t/p/original${movie.profile_path}`
                              : 'https://www.themoviedb.org/t/p/original/q9qKbux5Jo76Sj8g3luxBt6rYtz.jpg'
                        }
                        width="250px"
                        alt={movie.name}
                     />
                  </li>
               );
            })}
         </ul>
      </div>
   );
};
export default MovieCast;
// `https://www.themoviedb.org/t/p/original${movie.profile_path}`;
// if (movie.profile_path === "originalnull") movie.profile_path === "q9qKbux5Jo76Sj8g3luxBt6rYtz.jpg"
