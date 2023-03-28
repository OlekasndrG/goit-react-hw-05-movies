import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { NavContainer, StyledLink } from './Layout.styled';
import Loader from './Loader/Loader';

const Layout = () => {
   return (
      <>
         <NavContainer>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/movies">Movies</StyledLink>
         </NavContainer>
         <main>
            <Suspense fallback={<Loader />}>
               <Outlet />
            </Suspense>
         </main>
      </>
   );
};

export default Layout;
