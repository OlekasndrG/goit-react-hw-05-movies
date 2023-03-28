
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { lazy } from 'react';



// import Home from 'pages/Home';
// import MovieDetails from 'pages/MovieDetails';
// import Movies from 'pages/Movies';
// import MovieReviews from './Reviews';
// import MovieCast from './Cast';

const Home = lazy(() => import('../pages/Home'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieReviews = lazy(() => import('../components/Reviews'));
const MovieCast = lazy(() => import('../components/Cast'));

export default function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<div><p>Sorry, no page found</p></div>} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieDetails />}>
               <Route path="reviews" element={<MovieReviews />} />
               <Route path="cast" element={<MovieCast />} />
            </Route>
         </Route>
      </Routes>
   );
}
