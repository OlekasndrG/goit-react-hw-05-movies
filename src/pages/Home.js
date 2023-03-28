import axios from 'axios';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Link, useLocation } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { MoviesContainer } from 'components/Layout.styled';
export const API_KEY = 'ba542000abc8f23c21b9168c238e4f34';

const Home = () => {
   const location = useLocation();
   const [trending, setTrending] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);
   useEffect(() => {
      setIsLoading(true);
      const fetchTrending = async () => {
         try {
            const res = await axios(
               `https:api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
            );
            setTrending(res.data.results);
            setIsLoading(false);
            return res.data;
         } catch (error) {
            setError(error.message);
            console.log(error);
         }
      };
      fetchTrending();
   }, []);
   return (
      <div>
         {isLoading && <Loader />}
         <MoviesContainer>
            {trending.map(movie => {
               return (
                  <li key={nanoid()}>
                     <Link
                        to={`/movies/${movie.id}`}
                        state={{ from: location }}
                     >
                        {movie.title || movie.name}{' '}
                     </Link>
                  </li>
               );
            })}
         </MoviesContainer>
         {error && <p>{error}</p>}
      </div>
   );
};
export default Home;
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
