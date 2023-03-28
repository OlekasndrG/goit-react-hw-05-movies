import axios from 'axios';
import {
   DescriptionContainer,
   MovieDetailContainer,
} from 'components/Layout.styled';
import Loader from 'components/Loader/Loader';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
const API_KEY = 'ba542000abc8f23c21b9168c238e4f34';

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
const MovieDetails = () => {
   const { movieId } = useParams();
   const [isLoading, setIsloading] = useState(false);
   const [movie, setMovie] = useState(null);
   const [error, setError] = useState(null);
   const location = useLocation();
   const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

   useEffect(() => {
      setIsloading(true);
      const fetchMovie = async () => {
         try {
            const res = await axios(
               `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
            );
            setMovie(res.data);
            console.log(res.data);

            return res.data;
         } catch (error) {
            return setError(error.message);
         }
      };
      fetchMovie()
         // .then(res => {
         //    setMovie(res.data);
         // })
         .finally(() => setIsloading(false));
   }, [movieId]);
   return (
      <>
         <Link to={backLinkLocationRef.current}>go back</Link>
         {movie && (
            <MovieDetailContainer>
               <div>
                  <img
                     src={
                        movie.poster_path
                           ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
                           : 'https://www.themoviedb.org/t/p/original/q9qKbux5Jo76Sj8g3luxBt6rYtz.jpg'
                     }
                     width="280px"
                     alt={movie.title}
                  />
               </div>
               <DescriptionContainer>
                  <h2>
                     {movie.title} (
                     {movie.release_date.split('').slice(0, 4).join('')})
                  </h2>
                  <h3>Overview </h3>
                  <p>{movie.overview}</p>
                  <h3>User Score </h3>
                  <p>User Score: {`${movie.vote_average * 10}`}%</p>
                  <div>
                     <h3> Genres </h3>
                     {movie.genres.length > 0 ? (
                        movie.genres.map(genre => {
                           return <p key={genre.id}>{genre.name}</p>;
                        })
                     ) : (
                        <p>Відсутні</p>
                     )}
                  </div>
               </DescriptionContainer>
            </MovieDetailContainer>
         )}
         {isLoading && <Loader />}
         {error && <p>Pomulka : {error}</p>}
         <div>
            <Link to="reviews">reviews</Link>
         </div>
         <div>
            <Link to="cast">cast</Link>
         </div>
         <Suspense fallback={<Loader />}>
            <Outlet />
         </Suspense>
      </>
   );
};

export default MovieDetails;
